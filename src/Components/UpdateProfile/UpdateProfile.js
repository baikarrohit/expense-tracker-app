import { useContext, useRef } from "react";
import AuthContext from "../../Store/auth-context";
import classes from "./update.module.css";

const UpdateProfile = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: nameRef.current.value,
          photoUrl: urlRef.current.value,
          returnSecureToken: true,
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
        alert("profile updated successfully!");
        console.log(data);

        nameRef.current.value = "";
        urlRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <header className={classes.header}>
        <p>Winners never quite, Quitters never win.</p>
      </header>
      <div className={classes.section}>
        <h2>Contact Details</h2>
        <form onSubmit={submitHandler}>
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
