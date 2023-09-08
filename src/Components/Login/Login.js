import { Fragment, useContext, useRef, useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [forgetVisible, setForgetVisible] = useState(false);
  const submiHandler = (event) => {
    event.preventDefault();

    fetch(
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
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg;
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, data.email);
        alert("User has successfully login.");
        navigate("/profile", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
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
