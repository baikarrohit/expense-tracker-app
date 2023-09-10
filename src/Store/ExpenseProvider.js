import { useEffect, useState } from "react";
import ExpenseContext from "./exp-contex";
import axios from "axios";

const ExpeseProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemHandler = async (item) => {
    try {
      const res = await axios.post(
        "https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/expenses.json",
        {
          expense: item,
        }
      );
      console.log("cart items saved in backend", res.data);
    } catch (err) {
      console.log("Error while saving the cart to backend", err);
    }

    setItems((prevItems) => [...prevItems, item]);
  };

  const fetchItemFromBackend = async () => {
    try {
      const res = await axios.get(
        "https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/expenses.json"
      );

      if (res.data) {
        const fetchedItems = Object.values(res.data).map(
          (entry) => entry.expense
        );
        setItems(fetchedItems);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchItemFromBackend();
  }, []);

  const contextValue = {
    items: items,
    addItem: addItemHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpeseProvider;
