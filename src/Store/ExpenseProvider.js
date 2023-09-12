import { useContext, useEffect, useState } from "react";
import ExpenseContext from "./exp-contex";
import axios from "axios";
import AuthContext from "./auth-context";

const ExpeseProvider = (props) => {
  const [items, setItems] = useState([]);
  const [editItems, updateEditItems] = useState("");

  const authCtx = useContext(AuthContext);

  const fetchItemFromBackend = async () => {
    try {
      if (!authCtx.userEmail) {
        console.log("User email is not available.");
        return;
      }
      const email = authCtx.userEmail.replace(/[.@]/g, "");
      const res = await axios.get(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}expenses.json`
      );

      if (res.data) {
        const fetchedItems = Object.values(res.data).map(
          (entry) => entry.expense
        );
        setItems(fetchedItems);
        // Save fetchedItems to local storage
        localStorage.setItem("expenses", JSON.stringify(fetchedItems));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Try to retrieve data from local storage on component mount
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) {
      setItems(storedExpenses);
    } else {
      // If not available in local storage, fetch from backend
      fetchItemFromBackend();
    }
  }, []);

  const addItemHandler = async (item) => {
    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        console.log("User email is not available in localStorage.");
        return;
      }
      const email = localStorage["email"].replace(/[.@]/g, "");
      console.log(email);
      const res = await axios.post(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/${email}expenses.json`,
        item
      );
      console.log("cart items saved in backend", res.data);
    } catch (err) {
      console.log("Error while saving the cart to backend", err);
    }

    // Update local storage and state
    localStorage.setItem("expenses", JSON.stringify([...items, item]));
    setItems((prevItems) => [...prevItems, item]);
  };

  const deleteItemHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-project-a61f6-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      if (res.ok) {
        console.log("delete successful.");
      }
    } catch (err) {
      console.log("Error while deleting from database", err);
    }

    // Update local storage and state
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };
  
  const editItemHandler= (item, filtered)=>{
    updateEditItems(item);
    setItems(filtered);

  }

  const contextValue = {
    items: items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    onLogin: fetchItemFromBackend,
    editItems:editItems,
    editItem:editItemHandler
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpeseProvider;
