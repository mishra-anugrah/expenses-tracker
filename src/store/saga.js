import { call, takeEvery, put } from "redux-saga/effects";
import { setTransactions, addTransaction } from "./transactionsSlice";
import { sagaActions } from "./sagaActions";
import { postTransaction } from "../firebase/addExpenseFirestore";
import { fetchAllTransactions } from "../firebase/fetchAllExpenses";

export function* storeTransaction(action) {
  try {
    let result = yield call(() =>
      postTransaction(action.payload).then((res) => res)
    );
    yield put(addTransaction(result));
  } catch (error) {
    yield put({ type: sagaActions.SET_TRANSACTIONS_FAILED, error });
  }
}

export function* fetchTransactions() {
  try {
    const transactions = yield call(() => {
      const tr = fetchAllTransactions();
      console.log(tr);
      return tr;
    });
    yield put(setTransactions(transactions));
  } catch (error) {
    yield put({ type: sagaActions.FETCH_TRANSACTIONS_FAILED, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.SET_TRANSACTIONS, storeTransaction);
  yield takeEvery(sagaActions.FETCH_TRANSACTIONS, fetchTransactions);
}
