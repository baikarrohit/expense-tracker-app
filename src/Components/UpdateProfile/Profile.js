import React, { useContext, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import classes from "./Profile.module.css";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = location.pathname === "/profile";
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   fetchUserData();
  // }, [authCtx.token]);
  // Function to fetch user data from Firebase and update the state
  const fetchUserData = async () => {
    // if (!authCtx.token) {
    //   return;
    // }
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
      const data = await res.json();
      setUserData(data.users[0]);

      // if (res.ok) {
      //   const data = await res.json();
      //   console.log(data);
      // } else {
      //   throw new Error("Failed to fetch user data.");
      // }
    } catch (error) {
      console.error(error);
    }
    navigate("/profile", { replace: true });
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
              {/* <h5>Your profile is incomplete.</h5>
              <Link to="/updateprofile">Complete now.</Link> */}
              {!isLocation ? (
                "Your Profile is incomplete. "
              ) : (
                <React.Fragment>
                  Your profile <strong>x%</strong> completed.
                </React.Fragment>
              )}
              <button onClick={fetchUserData}>Complete now</button>
            </span>
          </div>
          <div className={classes.logout}>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </section>
      {isLocation && <UpdateProfile user={userData} />}
    </Fragment>
  );
};

export default Profile;
