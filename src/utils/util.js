export const createSummaryDataUtil = (transactions) => {
  let income = 0,
    expenses = 0;
  transactions.forEach((transaction) => {
    if (transaction.isExpense) expenses += Number(transaction.amount);
    else income += Number(transaction.amount);
  });
  return { totalIncome: income, totalExpense: expenses };
};
