import { List, ListItem, ListItemButton } from "@mui/material";
import React from "react";
import { Transaction } from "./Transaction";
import { Typography } from "@mui/material";

export const TransactionsList = () => {
  const transactions = [
    {
      title: "abc",
      amount: "120",
      category: "haha",
      description: "heheh",
      isExpense: true,
    },
    {
      title: "abc",
      amount: "120",
      category: "haha",
      description: "heheh",
      isExpense: false,
    },
    {
      title: "abc",
      amount: "120",
      category: "haha",
      description: "heheh",
      isExpense: true,
    },
  ];

  return (
    <div className="transactions-list">
      <Typography variant="h4">Transaction History</Typography>

      <List>
        {transactions.map((transaction) => (
          <Transaction transaction={transaction} />
        ))}
      </List>
    </div>
  );
};
