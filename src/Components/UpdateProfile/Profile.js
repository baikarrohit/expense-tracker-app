import React, { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Profile.module.css";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import { expenseActions } from "../../Store/expense-slice";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: auth.token,
          }),
        }
      );
      const data = await res.json();
      console.log("API Response:", data);
      if (!res.ok) {
        console.error("Failed to fetch user data:", data.error.message);
      } else {
        setUserData(data.users[0]);
      }

      // if (res.ok) {
      //   const data = await res.json();
      //   console.log(data);
      // } else {
      //   throw new Error("Failed to fetch user data.");
      // }
    } catch (error) {
      console.error(error);
    }
    // navigate("/profile", { replace: true });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(expenseActions.setItemsEmpty());
    navigate("/login", { replace: true });
  };
  const clickExpenseHandler = () => {
    navigate("/profile/expensetracker", { replace: true });
  };

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <h6>Welcome to Expense Tracker</h6>
            <button onClick={clickExpenseHandler}>Expense Tracker</button>
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
              <button onClick={() => navigate("/profile", { replace: true })}>
                Complete now
              </button>
            </span>
          </div>
          <div className={classes.logout}>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </section>
      {isLocation && <UpdateProfile user={userData} update={fetchUserData} />}
    </Fragment>
  );
};

export default Profile;
