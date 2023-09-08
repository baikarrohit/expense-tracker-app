import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");

  if (token === "" && localStorage.length !== 0) {
    setToken(localStorage["user"]);
  }
  const userLoggedIn = !!token;
  const loginHandler = (token, email) => {
    setToken(token);
    setUserEmail(email);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken("")
    setUserEmail("")
    localStorage.removeItem("token")
  };

  const contexValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail,
    login: loginHandler,
    logout: logoutHandler
   
  };
  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
