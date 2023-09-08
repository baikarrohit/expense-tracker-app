import { Outlet } from "react-router-dom";
import Profile from "../UpdateProfile/Profile";

const RootLayout = (props) => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};

export default RootLayout;
