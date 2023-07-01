import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const {
  setTransactions,
  addTransaction,
  setSelectedTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
