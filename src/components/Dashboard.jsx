/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button } from "@mui/material";
import { TransactionForm } from "./TransactionForm";
import { TransactionsList } from "./TransactionsList";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../store/sagaActions";
import { TransactionSummary } from "./TransactionSummary";
import { createSummaryDataUtil } from "../utils/util";
import {
  setSearchResults,
  updateSummaryData,
} from "../store/transactionsSlice";
import { Search } from "./Search";
import { debounce } from "lodash";
import { Chart } from "./Chart";

export const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [isCreateForm, setIsCreateForm] = React.useState(true);
  const [summary, setSummary] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const dispatch = useDispatch();

  const summaryData = useSelector((state) => ({
    income: state.transactions.totalIncome,
    expense: state.transactions.totalExpense,
  }));

  const transactions = useSelector((state) => state.transactions.transactions);
  const searchResults = useSelector(
    (state) => state.transactions.searchResults
  );

  React.useEffect(() => {
    dispatch({ type: sagaActions.FETCH_TRANSACTIONS });
  }, []);

  React.useEffect(() => {
    if (
      summaryData &&
      (!summary ||
        summaryData.totalExpense !== summary.totalExpense ||
        summaryData.totalIncome !== summary.totalIncome)
    )
      setSummary(summaryData);
  }, [summaryData]);

  React.useEffect(() => {
    if (transactions) {
      const summaryData = createSummaryDataUtil(transactions);
      setSummary(summaryData);
      dispatch(updateSummaryData(summaryData));
    }
  }, [transactions]);

  const handleCreatButtonClick = () => {
    setShowExpenseForm(true);
    setIsCreateForm(true);
  };

  const searchTransactions = React.useCallback(
    debounce((searchQuery) => {
      if (searchQuery && searchQuery.length)
        dispatch({
          type: sagaActions.SEARCH_TRANSACTIONS,
          payload: searchQuery,
        });
      else dispatch(setSearchResults(null));
    }, 500),
    []
  );

  return (
    <>
      <div className="add-new">
        {showExpenseForm ? (
          <div className="transaction-form-container">
            <TransactionForm
              isNew={isCreateForm}
              setShowExpenseForm={setShowExpenseForm}
            />
          </div>
        ) : (
          <></>
        )}

        {!showExpenseForm ? (
          <Button
            className="add-new__button"
            variant="contained"
            onClick={handleCreatButtonClick}
          >
            Add new
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="dashboard">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchTransactions={searchTransactions}
        />
        <Chart summary={summary} />

        <div className="transaction-container">
          <TransactionSummary summaryData={summary} />

          <TransactionsList
            setShowExpenseForm={setShowExpenseForm}
            transactions={searchResults ? searchResults : transactions}
          />
        </div>
      </div>
    </>
  );
};
