import { List } from "@mui/material";
import React from "react";
import { Transaction } from "./Transaction";
import { Typography } from "@mui/material";

export const TransactionsList = (props) => {
  const { setShowExpenseForm, transactions } = props;

  return (
    <div className="transactions-list">
      <Typography variant="h4">Transaction History</Typography>

      <List>
        {transactions?.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            setShowExpenseForm={setShowExpenseForm}
          />
        ))}
      </List>
      {transactions && transactions.length === 0 ? (
        <div>no results</div>
      ) : (
        <></>
      )}
    </div>
  );
};
