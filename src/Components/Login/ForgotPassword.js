import { useRef } from "react";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = (props) => {
  const emailRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.json());
      alert("Reset email sent.");
      props.onReset();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className={classes.frgtPass}>
      <h1 className={classes.title}>Forgot Password</h1>
      <form className={classes.form}>
        <label>Enter the email with which you have registered.</label>
        <input type="email" placeholder="Email" ref={emailRef} />

        <button type="submit" onClick={submitHandler}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
