import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense-slice";

const ExpenseList = () => {
  const expense = useSelector((state) => state.expenseStore);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const editHandler = (item) => {
    const filter = expense.items.filter((ele) => ele !== item);
    dispatch(expenseActions.editItems({ item: item, filtered: filter }));
  };

  const deleteHandler = async (item) => {
    dispatch(expenseActions.removeItem(item));
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.get(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses.json`
      );
      const data = res.data;
      const Id = Object.keys(data).find((eleId) => data[eleId].id === item.id);
      try {
        const res = await axios.delete(
          `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
        );
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      console.log("Error while deleting from database", err);
    }
  };

  const fetchItemFromBackend = async () => {
    try {
      const email = auth.userEmail.replace(/[.@]/g, "");
      const res = await axios.get(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/expenses.json`
      );

      if (res.data) {
        const fetchedItems = Object.values(res.data).reverse();
        console.log(fetchedItems);
        dispatch(expenseActions.setItems(fetchedItems));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth.userEmail !== null) {
      fetchItemFromBackend();
    }
  }, [auth.userEmail]);

  let total = 0;
  if (expense.items) {
    expense.items.forEach((item) => {
      if (item && item.enteredAmount) {
        total += Number(item.enteredAmount);
      }
    });
  }

  return (
    <section>
      <div>
        <h1>Expenses</h1>
        <div>
          <h3>Total Expense</h3>
          {total >= 10000 && <button>Activate Premium</button>}
          <span>Rs. {total}</span>
        </div>
        {total >= 10000 && (
          <p style={{ color: "red" }}>
            Please Activate Premium. Total Expense is More Than 10000
          </p>
        )}
      </div>
      <ul>
        {expense.items.map((item, idx) => (
          <li key={idx}>
            {item && item.enteredCat && <h3>{item.enteredCat}</h3>}
            {item && item.enteredDesc && <div>{item.enteredDesc}</div>}
            {item && item.enteredAmount && <div>{item.enteredAmount}</div>}

            <button onClick={() => deleteHandler(item)}>Delete</button>
            <button onClick={() => editHandler(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
