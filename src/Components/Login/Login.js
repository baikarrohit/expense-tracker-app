import { Fragment, useRef, useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import axios from "axios";
import { themeActions } from "../../Store/theme-slice";

const Login = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [forgetVisible, setForgetVisible] = useState(false);

  const submiHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
        {
          method: "POST",
          body: JSON.stringify({
            email: inputRef.current.value,
            password: passwordRef.current.value,
            reurnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        navigate("/profile/expensetracker", { replace: true });
        dispatch(
          authActions.login({ tokenId: data.idToken, email: data.email })
        );
        const email = inputRef.current.value.replace(/[.@]/, "");
        const modeRes = axios.get(
          `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/userDetail.json`
        );
        if (modeRes.data) {
          dispatch(themeActions.toggleTheme());
          dispatch(authActions.setIsPremium());
          localStorage.setItem("isPremium", true);
        }
      } else {
        throw Error("Authentication Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const forgotHandler = () => {
    setForgetVisible(true);
  };

  return (
    <Fragment>
      {forgetVisible ? (
        <ForgotPassword onReset={() => setForgetVisible(false)} />
      ) : (
        <div>
          <section className={classes.auth}>
            <div>
              <h2>Login</h2>
            </div>

            <form onSubmit={submiHandler} className={classes.form}>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  ref={inputRef}
                  required
                />
              </div>

              <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </div>

              <button type="submit" className={classes.loginBtn}>
                Login
              </button>
            </form>
            <div className={classes.forgetBtn}>
              <Link onClick={forgotHandler}>Forgot Password?</Link>
            </div>
          </section>
          <section className={classes.lowersec}>
            <Link to="/">Don't have an account? Sign Up</Link>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
