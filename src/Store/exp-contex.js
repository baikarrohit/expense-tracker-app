import React from "react";

const ExpenseContext = React.createContext({
  items: [],
  addItem: (item) => {},
  editItems: {},
  deleteItem: (item) => {},
  editItem: (item) => {},
  onLogin: () => {}
});

export default ExpenseContext;
