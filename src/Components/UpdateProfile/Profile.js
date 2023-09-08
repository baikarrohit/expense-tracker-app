import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import classes from './Profile.module.css'

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [authCtx.token]);
  // Function to fetch user data from Firebase and update the state
  const fetchUserData = async () => {
    if (!authCtx.token) {
      return;
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE", // Replace with your API key
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        throw new Error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login", { replace: true });
  };

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <p>Welcome to Expense Tracker</p>

            <span className={classes.incomplete}>
              <h5>Your profile is incomplete.</h5>

              <Link to="/updateprofile">Complete now.</Link>
            </span>
          </div>
          <div className={classes.logout}>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
