import React from "react";
import { Button } from "@mui/material";
import { TransactionForm } from "./TransactionForm";
import { TransactionsList } from "./TransactionsList";

export const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [isCreateForm, setIsCreateForm] = React.useState(true);

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

        <TransactionsList />
      </div>
    </div>
  );
};
