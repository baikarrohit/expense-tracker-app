import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

import Profile from "./Components/UpdateProfile/Profile";
//import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import Expense from "./Components/ExpenseTracker/Expense";

import RootLayout from "./Components/Layout/Root";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={`App ${isLoggedIn && isDarkMode ? "darkTheme" : "lightTheme"}`}
    >
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/expensetracker" element={<RootLayout />}>
          <Route index element={<Expense />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
