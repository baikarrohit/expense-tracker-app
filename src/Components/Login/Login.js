import { Fragment, useRef } from "react";
import classes from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
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
        console.log(data.email, data.idToken);
        alert("User has successfully login.");
        navigate("/welcome", {replace: true})

      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Fragment>
    <section className={classes.auth}>
      <div>
        <h2>Login</h2>
      </div>

      <form onSubmit={submiHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" ref={inputRef} required />
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

        <button type="submit" className={classes.loginBtn}>Login</button>
      </form>
    </section>
    <section className={classes.lowersec}>
        <Link to="/">Don't have an account? Sign Up</Link>
    </section>
    </Fragment>
  );
};

export default Login;
