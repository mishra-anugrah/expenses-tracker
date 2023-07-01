import React from "react";
import {
  Backdrop,
  Button,
  FormControl,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { sagaActions } from "../store/sagaActions";
import { useSelector, useDispatch } from "react-redux";

export const TransactionForm = (props) => {
  const { setShowExpenseForm } = props;

  const [isExpense, setIsExpense] = React.useState(false);
  const [transactionData, setTransactionData] = React.useState({
    isExpense: isExpense,
    title: "",
    description: "",
    amount: "",
    category: "",
  });
  const [formErrors, setFormErrors] = React.useState([]);

  const [isNewForm, setIsNewForm] = React.useState();

  const dispatch = useDispatch();

  const selectedTransactionToEdit = useSelector(
    (state) => state.transactions.selectedTransaction
  );

  React.useEffect(() => {
    if (selectedTransactionToEdit) {
      setIsNewForm(false);
      setTransactionData(selectedTransactionToEdit);
      setIsExpense(selectedTransactionToEdit.isExpense);
    } else {
      setIsNewForm(true);
    }
  }, [selectedTransactionToEdit]);

  const formTitle = React.useMemo(() => {
    if (isNewForm) {
      return `Add new ${isExpense ? "expense" : "income"}`;
    }
    return `Edit`;
  }, [isExpense, isNewForm]);

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

  const handleSaveTransaction = () => {
    console.log("submitting", transactionData);
    const [date, time] = new Date().toLocaleString().split(",");

    const payload = {
      ...transactionData,
      date,
      time,
    };

    if (isValidForm(payload)) {
      if (isNewForm) {
        // add new transaction
        dispatch({
          type: sagaActions.SET_TRANSACTIONS,
          payload,
        });
      } else {
        // edit transaction
        dispatch({ type: sagaActions.UPDATE_TRANSACTION, payload });
      }
      setTransactionData({});
      setShowExpenseForm(false);
    }
  };

  const isValidForm = (formData) => {
    const mandatoryFields = ["title", "amount", "category"];

    const errors = [];

    for (const [key, value] of Object.entries(formData)) {
      if (mandatoryFields.includes(key) && !value) {
        errors.push(key);
      }
    }

    setFormErrors(errors);
    return !errors.length;
  };

  return (
    <Backdrop open={true}>
      <div className="transaction-form">
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
            InputLabelProps={{ shrink: true }}
            required
            error={formErrors.includes("title")}
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
            InputLabelProps={{ shrink: true }}
            error={formErrors.includes("amount")}
            required
          />

          <TextField
            label="Category"
            value={transactionData.category}
            onChange={handleFormValueChange}
            name="category"
            className="transaction-field"
            InputLabelProps={{ shrink: true }}
            error={formErrors.includes("category")}
            required
          />

          <TextField
            label="Description"
            value={transactionData.description}
            onChange={handleFormValueChange}
            name="description"
            className="transaction-field"
            multiline
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        {formErrors.length ? (
          <Typography sx={{ color: "red" }}>
            * Please fill all mandatory fields
          </Typography>
        ) : (
          <></>
        )}

        <div className="transaction-form__buttons">
          <Button
            className="justify-end"
            variant="contained"
            onClick={handleSaveTransaction}
          >
            Submit
          </Button>
          <Button color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};
