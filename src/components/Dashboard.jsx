/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button } from "@mui/material";
import { TransactionForm } from "./TransactionForm";
import { TransactionsList } from "./TransactionsList";
import { useDispatch } from "react-redux";
import { sagaActions } from "../store/sagaActions";

export const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [isCreateForm, setIsCreateForm] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: sagaActions.FETCH_TRANSACTIONS });
  }, []);

  const handleCreatButtonClick = () => {
    setShowExpenseForm(true);
    setIsCreateForm(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__controls">
        <Button variant="contained" onClick={handleCreatButtonClick}>
          Add new
        </Button>
      </div>
      <div className="transaction-container">
        {showExpenseForm ? (
          <TransactionForm
            isNew={isCreateForm}
            setShowExpenseForm={setShowExpenseForm}
          />
        ) : (
          <></>
        )}

        <TransactionsList setShowExpenseForm={setShowExpenseForm} />
      </div>
    </div>
  );
};
