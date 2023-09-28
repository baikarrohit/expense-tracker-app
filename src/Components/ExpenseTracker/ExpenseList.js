import axios from "axios";
import classes from './ExpenseList.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense-slice";
import { FaCrown } from "react-icons/fa";
import { themeActions } from "../../Store/theme-slice";
import { authActions } from "../../Store/auth-slice";

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
  const clickAccountPremiumHandler = async () => {
    dispatch(themeActions.toggleTheme());
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = axios.post(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}/userDetail.json`,
        { isPremium: true }
      );
    } catch (err) {
      alert(err);
    }
    dispatch(authActions.setIsPremium());
    localStorage.setItem("isPremium", true);
  };

  const clickDownloadHandler = () => {
    const generateCSV = (itemArr) => {
      const csvRows = [];
      const headers = ["Description", "Category", "Amount"];
      csvRows.push(headers.join(","));

      itemArr.forEach((i) => {
        const row = [i.enteredDesc, i.enteredCat, i.enteredAmount];
        csvRows.push(row.join(","));
      });
      return csvRows.join("\n");
    };
    const csvContent = generateCSV(expense.items);
    const blob = new Blob([csvContent], { type: "csv/text" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "expenses.csv";
    downloadLink.click();
  };

  return (
    <section className={classes.listCon}>
      <div className={classes.container}>
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
          <h3>Total Expense</h3>
          {total >= 10000 &&
            (!auth.isPremium ? (
              <button onClick={clickAccountPremiumHandler}>
                Activate Premium
              </button>
            ) : (
              <button onClick={clickDownloadHandler}>
                <FaCrown /> Download
              </button>
            ))}
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
          <li className={classes.listItem} key={idx}>
            {item && item.enteredCat && <h3 className={classes.category}>{item.enteredCat}</h3>}
            {item && item.enteredDesc && <div className={classes.des}>{item.enteredDesc}</div>}
            {item && item.enteredAmount && <div className={classes.Amt}>{item.enteredAmount}</div>}

            <button className={classes.dlt} onClick={() => deleteHandler(item)}>Delete</button>
            <button className={classes.edit} onClick={() => editHandler(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
