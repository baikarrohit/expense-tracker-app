import { useEffect, useRef } from "react";
import classes from "./update.module.css";

const UpdateProfile = (props) => {
  const nameRef = useRef();
  const urlRef = useRef();
  const formRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (props.user) {
      if(props.user.displayName ){
        nameRef.current.value = props.user.displayName;
        }
      
      emailRef.current.value = props.user.email;
    }
  }, [props.user]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage["user"],
            displayName: nameRef.current.value,
            photoUrl: urlRef.current.value
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        alert("profile updated.");
        props.update();
        nameRef.current.value = props.user.displayName;
        emailRef.current.value = props.user.email;
      } else {
        const errorResponse = await res.json(); // Get the error response from the server
        console.error("Error updating profile:", errorResponse);
        throw new Error("Profile update failed. Please try again.");
      }
      formRef.current.reset();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <header className={classes.header}>
        <p>Winners never quite, Quitters never win.</p>
      </header>
      <div className={classes.section}>
        <h2>Contact Details</h2>
        <form onSubmit={submitHandler} ref={formRef}>
          <label>Email:</label>
          <input type="email" ref={emailRef} />
          <label>Full Name:</label>
          <input type="text" ref={nameRef} />
          <label>Profile photo URL:</label>
          <input type="text" ref={urlRef} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
