import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import AuthProvider from "./Store/AuthProvider";
import Profile from "./Components/UpdateProfile/Profile";
//import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import Expense from "./Components/ExpenseTracker/Expense";
import ExpeseProvider from "./Store/ExpenseProvider";
import RootLayout from "./Components/Layout/Root";
function App() {
  return (
    //<AuthProvider>
    //  <ExpeseProvider>
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/expensetracker" element={<RootLayout />}>
          <Route index element={<Expense />} />
        </Route>
      </Routes>
    </div>
    // </ExpeseProvider>
    // </AuthProvider>
  );
}

export default App;
