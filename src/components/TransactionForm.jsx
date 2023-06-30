import React from "react";
import {
  Button,
  FormControl,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { sagaActions } from "../store/sagaActions";
import { useSelector, useDispatch } from "react-redux";

export const TransactionForm = (props) => {
  const { isNew, setShowExpenseForm } = props;

  const [isExpense, setIsExpense] = React.useState(false);
  const [transactionData, setTransactionData] = React.useState({
    isExpense: isExpense,
  });

  const transactions = useSelector((state) => state.transactions);
  console.log("ttttttttttttt ", transactions);

  const dispatch = useDispatch();

  const formTitle = React.useMemo(() => {
    if (isNew) {
      return `Add new ${isExpense ? "expense" : "income"}`;
    }
    return `Edit`;
  }, [isExpense, isNew]);

  const handleFormValueChange = (event) => {
    const newData = { ...transactionData };
    if (event.target.name === "isExpense") {
      setIsExpense(!isExpense);
      newData[event.target.name] = event.target.checked;
    } else newData[event.target.name] = event.target.value;
    setTransactionData(newData);
  };

  const handleCancel = () => {
    setTransactionData({});
    setShowExpenseForm(false);
  };

  const handleAddTransaction = () => {
    console.log("submitting", transactionData);
    dispatch({
      type: sagaActions.SET_TRANSACTIONS,
      payload: { ...transactionData, id: new Date().getTime() },
    });
  };

  return (
    <div className="transaction-form">
      {/* <Typography variant="h4">{`Add new ${
        isExpense ? "expense" : "income"
      }`}</Typography> */}

      <Typography variant="h4">{formTitle}</Typography>
      <div className="transaction-form__controls">
        <div className="expense-toggle">
          Income
          <Switch
            checked={isExpense}
            onChange={handleFormValueChange}
            name="isExpense"
            value={isExpense}
          />
          Expense
        </div>
      </div>
      <FormControl>
        <TextField
          label="Title"
          value={transactionData.title}
          onChange={handleFormValueChange}
          name="title"
          className="transaction-field"
        />

        <TextField
          label="Amount"
          value={transactionData.amount}
          onChange={handleFormValueChange}
          name="amount"
          className={`transaction-field ${
            isExpense ? "expense-input" : "income-input"
          }`}
          type="number"
        />

        <TextField
          label="Category"
          value={transactionData.category}
          onChange={handleFormValueChange}
          name="category"
          className="transaction-field"
        />

        <TextField
          label="Description"
          value={transactionData.description}
          onChange={handleFormValueChange}
          name="description"
          className="transaction-field"
          multiline
        />
      </FormControl>

      <div className="transaction-form__buttons">
        <Button
          className="justify-end"
          variant="contained"
          onClick={handleAddTransaction}
        >
          Submit
        </Button>
        <Button color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
