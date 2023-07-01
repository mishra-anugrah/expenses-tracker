/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button } from "@mui/material";
import { TransactionForm } from "./TransactionForm";
import { TransactionsList } from "./TransactionsList";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../store/sagaActions";
import { TransactionSummary } from "./TransactionSummary";
import { createSummaryDataUtil } from "../utils/util";
import { updateSummaryData } from "../store/transactionsSlice";

export const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [isCreateForm, setIsCreateForm] = React.useState(true);
  const [summary, setSummary] = React.useState(null);

  const dispatch = useDispatch();

  const summaryData = useSelector((state) => ({
    income: state.transactions.totalIncome,
    expense: state.transactions.totalExpense,
  }));

  const transactions = useSelector((state) => state.transactions.transactions);

  React.useEffect(() => {
    dispatch({ type: sagaActions.FETCH_TRANSACTIONS });
  }, []);

  React.useEffect(() => {
    if (summaryData) setSummary(summaryData);
  }, [summaryData]);

  const handleCreatButtonClick = () => {
    setShowExpenseForm(true);
    setIsCreateForm(true);
  };

  React.useEffect(() => {
    if (transactions) {
      const summaryData = createSummaryDataUtil(transactions);
      setSummary(summaryData);
      dispatch(updateSummaryData(summaryData));
    }
  }, [transactions]);

  return (
    <div className="dashboard">
      <div className="dashboard__controls">
        <Button variant="contained" onClick={handleCreatButtonClick}>
          Add new
        </Button>
      </div>
      <div className="transaction-container">
        <TransactionSummary summaryData={summary} />
        {showExpenseForm ? (
          <TransactionForm
            isNew={isCreateForm}
            setShowExpenseForm={setShowExpenseForm}
          />
        ) : (
          <></>
        )}

        <TransactionsList
          setShowExpenseForm={setShowExpenseForm}
          transactions={transactions}
        />
      </div>
    </div>
  );
};
