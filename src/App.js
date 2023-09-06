import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Welcome from "./Components/Welcome/Welcome";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
