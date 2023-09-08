import { useContext } from "react";
import ExpenseContext from "../../Store/exp-contex";

const ExpenseList = () => {
  const expCntx = useContext(ExpenseContext);
  return (
    <section>
      <ul>
        {console.log(expCntx.items)}
        {expCntx.items.map((item) => (
          <li>
            <h3>{item.enteredCat}</h3>
            <div>{item.enteredDesc}</div>
            <div>{item.enteredAmount}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
