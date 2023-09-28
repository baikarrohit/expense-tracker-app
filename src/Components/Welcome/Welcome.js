import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>
        Your profile is incomplete.<Link to="/updateprofile">Complete now</Link>
      </p>
    </div>
  );
};

export default Welcome;
// import React, {useContext, useState } from "react";
// import UpdateProfile from "./UpdateProfile";
// import AuthContext from "../../Store/auth-context";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const [updateVisible, setUpdateVisible] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const authCtx = useContext(AuthContext);

//   const updateVisibleHandler = async () => {
//     setUpdateVisible(true);
//     try {
//       const res = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBORf5edv8sP32P-5ZbBrGFvteOJFsMKlE",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             idToken: authCtx.token,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await res.json();
//       setUserData(data.users[0]);
//       console.log(data.users)
//     } catch (error) {
//       alert(error);
//     }
//   };
//   return (
//     <div>
//       <h1>Welcome to Expense Tracker</h1>
//       <span>
//         {!updateVisible
//           ? ("Your profile is incomplete.")
//           : ("Your profile x% completed.")}
//         <Link to="/updateprofile" onClick={updateVisibleHandler}>Complete now.</Link>
//       </span>
//       {updateVisible && <UpdateProfile user={userData}/>}
//     </div>
//   );
// };

// export default Profile;
