import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>
        Your profile is incomplete.<Link to="/updateprofile">Complete now</Link>
      </p>
    </div>
  );
};

export default Welcome;
