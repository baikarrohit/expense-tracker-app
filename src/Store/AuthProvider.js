import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const contexValue = {
    token: token,
    login: loginHandler,
  };
  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
