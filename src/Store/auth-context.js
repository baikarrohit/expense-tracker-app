import React from "react";
const AuthContext = React.createContext({
  token: "",
  login: (token) => {},
});

export default AuthContext;
