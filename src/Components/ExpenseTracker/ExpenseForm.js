import { useContext, useRef, useEffect } from "react";
import ExpenseContext from "../../Store/exp-contex";

const ExpenseForm = () => {
  const amountRef = useRef();
  const descRef = useRef();
  const catRef = useRef();
  const expCntx = useContext(ExpenseContext);

  useEffect(() => {
    if (expCntx.editItems !== "") {
      amountRef.current.value = expCntx.editItems.enteredAmount;
      descRef.current.value = expCntx.editItems.enteredDesc;
      catRef.current.value = expCntx.editItems.cat;
    }
  }, [expCntx.editItems]);

  const submitHandler = (e) => {
    e.preventDefault();
    const expObj = {
      id: Math.random().toString(),
      enteredAmount: amountRef.current.value,
      enteredDesc: descRef.current.value,
      enteredCat: catRef.current.value,
    };
    console.log(expObj);
    expCntx.addItem(expObj);
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" ref={amountRef} />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <input type="text" ref={descRef} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select ref={catRef}>
            <option>Food</option>
            <option>Petrol</option>
            <option>Salary</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </section>
  );
};

export default ExpenseForm;
