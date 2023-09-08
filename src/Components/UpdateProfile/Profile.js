import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);

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
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
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

  // Check if user data is already available in state, if not, fetch it.

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <span>
        <h2>Your profile is incomplete.</h2>

        <Link to="/updateprofile">Complete now.</Link>
      </span>
    </div>
  );
};

export default Profile;
