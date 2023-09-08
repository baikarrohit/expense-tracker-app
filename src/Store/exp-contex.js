import React from "react";

const ExpenseContext = React.createContext({
  items: [],
  addItem: (item) => {},
});

export default ExpenseContext;
