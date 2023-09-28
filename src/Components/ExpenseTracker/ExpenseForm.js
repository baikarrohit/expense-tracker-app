import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense-slice";

const ExpenseForm = () => {
  const amountRef = useRef();
  const descRef = useRef();
  const catRef = useRef();
  const auth = useSelector((state) => state.auth);
  const expense = useSelector((state) => state.expenseStore);
  const dispatch = useDispatch();
  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    if (expense.editItems !== null) {
      amountRef.current.value = expense.editItems.enteredAmount;
      descRef.current.value = expense.editItems.enteredDesc;
      catRef.current.value = expense.editItems.cat;
    }
  }, [expense.editItems]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      amountRef.current.value === "" ||
      descRef.current.value === "" ||
      catRef.current.value === ""
    ) {
      setIsInputValid(true);
      return;
    }
    setIsInputValid(true);

    if (expense.editItems !== null) {
      const email = auth.userEmail.replace(/[.@]/g, "");
      try {
        const res = await axios.get(
          `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses.json`
        );
        const data = res.data;
        const Id = Object.keys(data).find(
          (eleId) => data[eleId].id === expense.editItems.id
        );
        try {
          const resDlt = await axios.delete(
            `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
          );
        } catch (err) {
          alert(err);
        }
      } catch (err) {
        console.log("Error while saving the cart to backend", err);
      }
      dispatch(expenseActions.setEditItemsNull());
    }
    const expObj = {
      id: Math.random().toString(),
      enteredAmount: amountRef.current.value,
      enteredDesc: descRef.current.value,
      enteredCat: catRef.current.value,
    };
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.post(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses.json`,
        expObj
      );
      console.log("items saved in backend", res.data);
    } catch (err) {
      console.log("Error while saving the cart to backend", err);
    }
    dispatch(expenseActions.addItem(expObj));
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        {!isInputValid && (
          <p style={{ color: "red" }}>*Please fill all input.</p>
        )}
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
