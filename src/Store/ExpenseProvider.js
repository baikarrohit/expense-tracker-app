import { useState } from "react";
import ExpenseContext from "./exp-contex";

const ExpeseProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemHandler = (item) => {
    console.log(item)
    setItems((prevItems) => [...prevItems, item]);
  };
  
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
