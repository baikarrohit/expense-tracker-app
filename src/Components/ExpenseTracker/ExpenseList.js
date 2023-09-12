import { useContext } from "react";
import ExpenseContext from "../../Store/exp-contex";

const ExpenseList = () => {
  const expCntx = useContext(ExpenseContext);

  const editHandler = (item) => {
    const filter = expCntx.items.filter((ele) => ele!== item)
    expCntx.editItem(item,filter)
  }

  const deleteHandler = (id) => {
    expCntx.deleteItem(id);
  };

  return (
    <section>
      <ul>

        {expCntx.items.map((item, idx) => (
          <li key={idx}>
            <h3>{item.enteredCat}</h3>
            <div>{item.enteredDesc}</div>
            <div>{item.enteredAmount}</div>
            <button onClick={() => deleteHandler(item.id)}>Delete</button>
            <button onClick={() => editHandler(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
