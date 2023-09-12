import { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./exp-contex";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUserEmail = localStorage.getItem("userEmail");
  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const expCntx = useContext(ExpenseContext);

  // const onRefresh = () => {
  //   if (token === "" && localStorage.length !== 0) {
  //     setToken(localStorage["user"]);
  //     setUserEmail(localStorage["email"]);
  //   }
  // };

  // useEffect(() => {
  //   onRefresh();
  // }, []);

  const userLoggedIn = !!token;
  const loginHandler = (token, email) => {
    setToken(token);
    setUserEmail(email);
    expCntx.onLogin();
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken("");
    setUserEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contexValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
