import React from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userEmail: "",
  login: (token,email) => {},
  logout: () => {},
});

export default AuthContext;
