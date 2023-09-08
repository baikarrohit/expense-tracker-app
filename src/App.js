import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import AuthProvider from "./Store/AuthProvider";
import Profile from "./Components/UpdateProfile/Profile";
//import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import Expense from "./Components/ExpenseTracker/Expense";
import ExpeseProvider from "./Store/ExpenseProvider";
function App() {
  return (
    <AuthProvider>
      <ExpeseProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/expense-tracker" element={<Expense/>} />
        </Routes>
      </ExpeseProvider>
    </AuthProvider>
  );
}

export default App;
