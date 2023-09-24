import "../styles/Transaction.css";
import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseGraph from "./ExpenseGraph";

function Expenses() {
  return (
    <>
      <div className="placement">
        <div className="graph"></div>
        <div className="add-data">
          <AddExpenseForm />
        </div>
        <div className="data-table">
          <ExpenseTable />
          <ExpenseGraph />
        </div>
      </div>
    </>
  );
}

export default Expenses;
