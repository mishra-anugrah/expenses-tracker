import { createSlice } from "@reduxjs/toolkit";
import { createSummaryDataUtil } from "../utils/util";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: null,
    selectedTransaction: null,
    totalIncome: 0,
    totalExpense: 0,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      if (state.transactions)
        state.transactions = [action.payload, ...state.transactions];
      else state.transactions = [action.payload];
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    updateTransaction: (state, action) => {
      let transactions = state.transactions;
      transactions = transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
      state.transactions = transactions;
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    createSummaryData: (state, action) => {
      const { totalIncome, totalExpense } = createSummaryDataUtil(
        action.payload
      );

      state.totalExpense = totalExpense;
      state.totalIncome = totalIncome;
    },
    summaryDataAdd: (state, action) => {
      state.totalIncome += action.payload.amount;
      state.totalExpense += action.payload.amount;
    },
    updateSummaryData: (state, action) => {
      state.totalExpense = action.payload.totalExpense;
      state.totalIncome = action.payload.totalIncome;
      // if (action.payload.isDelete) {
      //   if (action.payload.isExpense)
      //     state.totalExpense -= Number(action.payload.amount);
      //   else state.totalIncome -= Number(action.payload.amount);
      // } else {
      //   if (action.payload.isExpense)
      //     state.totalExpense += Number(action.payload.amount);
      //   else state.totalIncome += Number(action.payload.amount);
      // }
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  setSelectedTransaction,
  updateTransaction,
  deleteTransaction,
  createSummaryData,
  updateSummaryData,
  summaryDataAdd,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
