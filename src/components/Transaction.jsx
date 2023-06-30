import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

export const Transaction = (props) => {
  const { isExpense, title, amount } = props.transaction;

  return (
    <div>
      <ListItem
        className={`transaction-item ${
          isExpense ? "expense-item" : "income-item"
        }`}
      >
        <ListItemButton>
          <ListItemText primary={title} />
          <ListItemText primary={amount} />
        </ListItemButton>
      </ListItem>
    </div>
  );
};
