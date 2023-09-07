import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
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
          setUserData(data.users[0]);
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check if user data is already available in state, if not, fetch it.
    if (!userData) {
      fetchUserData();
    }
  }, [authCtx.token, userData]);

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <span>
        {!updateVisible
          ? "Your profile is incomplete."
          : "Your profile x% completed."}
        <Link to="/updateprofile" onClick={() => setUpdateVisible(true)}>
          Complete now.
        </Link>
      </span>
      {console.log("userData in Profile component: ", userData)}
      {updateVisible && <UpdateProfile user={userData} />}
    </div>
  );
};

export default Profile;