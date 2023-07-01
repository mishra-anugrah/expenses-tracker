import { Typography } from "@mui/material";
import React from "react";

export const TransactionSummary = (props) => {
  const { summaryData } = props;
  return (
    <div className="transaction-summary">
      <div className="transaction-summary__content">
        <div className="income-summary">
          <Typography variant="h5">Income</Typography>
          <Typography className="amount income">
            {summaryData?.income}
          </Typography>
        </div>
        <div className="expenses-summary">
          <Typography variant="h5">Expense</Typography>
          <Typography className="amount expense">
            {summaryData?.expense}
          </Typography>
        </div>
      </div>
    </div>
  );
};
