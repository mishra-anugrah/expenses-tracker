import { List } from "@mui/material";
import React from "react";
import { Transaction } from "./Transaction";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const TransactionsList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  return (
    <div className="transactions-list">
      <Typography variant="h4">Transaction History</Typography>

      <List>
        {transactions?.map((transaction) => (
          <Transaction transaction={transaction} />
        ))}
      </List>
    </div>
  );
};
