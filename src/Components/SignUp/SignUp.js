import { Fragment, useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const confPassRef = useRef();
  const navigate = useNavigate();
  const [verifyEmail, setVerifyEmail] = useState(false);

  const submiHandler = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== confPassRef.current.value) {
      alert("Password do not match! please type again.");
      return;
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
        {
          method: "POST",
          body: JSON.stringify({
            email: inputRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
            {
              method: "POST",
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: data.idToken,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            alert("Verification email sent.");
            setVerifyEmail(true);
            setTimeout(() => {
              setVerifyEmail(false);
              navigate("/login", { replace: true });
            }, 10000);
          } else {
            throw new Error("Sign up failed. Try again!");
          }
        } catch (err) {
          alert(err);
        }
      } else {
        alert("Authentication Failed!");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Fragment>
      <section className={classes.auth}>
        <div>
          <h2>Sign Up</h2>
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

          <div className={classes.control}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confPassRef}
              required
            />
          </div>

          <button type="submit" className={classes.signupBtn}>
            Sign Up
          </button>
          {verifyEmail && (
            <p style={{ margin: "1rem", color: "green" }}>
              Please verify email. Verification mail already sent.
            </p>
          )}
        </form>
      </section>

      <section className={classes.lowerSec}>
        <Link to="/login">Have an account? Login</Link>
      </section>
    </Fragment>
  );
};

export default SignUp;
