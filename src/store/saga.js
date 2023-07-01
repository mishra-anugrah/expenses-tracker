import { call, takeEvery, put } from "redux-saga/effects";
import {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  createSummaryData,
  // updateSummaryData,
  summaryDataAdd,
} from "./transactionsSlice";
import { sagaActions } from "./sagaActions";
import { postTransactionFirebase } from "../firebase/addExpenseFirestore";
import { fetchAllTransactions } from "../firebase/fetchAllExpenses";
import { updateTransactionFirebase } from "../firebase/updateTransactionFirebase";
import { deleteTransactionFirebase } from "../firebase/deleteTransactionFirebase";

export function* storeTransactionSaga(action) {
  try {
    let result = yield call(() =>
      postTransactionFirebase(action.payload).then((res) => res)
    );
    yield put(addTransaction(result));
    yield put(updateTransaction(action.payload));
    yield put(summaryDataAdd(action.payload));
    // yield put(updateSummaryData(action.payload));
  } catch (error) {
    yield put({ type: sagaActions.SET_TRANSACTIONS_FAILED, error });
  }
}

export function* fetchTransactionsSaga() {
  try {
    const transactions = yield call(() => fetchAllTransactions());
    yield put(setTransactions(transactions));
    yield put(createSummaryData(transactions));
  } catch (error) {
    yield put({ type: sagaActions.FETCH_TRANSACTIONS_FAILED, error });
  }
}

export function* updateTransactionSaga(action) {
  try {
    yield call(() => updateTransactionFirebase(action.payload));
    yield put(updateTransaction(action.payload));
    // yield put(updateSummaryData(action.payload));
  } catch (error) {
    yield put({ type: sagaActions.UPDATE_TRANSACTION_FAILED, error });
  }
}

export function* deleteTransactionSaga(action) {
  try {
    yield call(() => deleteTransactionFirebase(action.payload.id));
    yield put(deleteTransaction(action.payload.id));
    // yield put(updateSummaryData({ ...action.payload, isDelete: true }));
  } catch (error) {
    yield put({ type: sagaActions.DELETE_TRANSACTION_FAILED, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.SET_TRANSACTIONS, storeTransactionSaga);
  yield takeEvery(sagaActions.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeEvery(sagaActions.UPDATE_TRANSACTION, updateTransactionSaga);
  yield takeEvery(sagaActions.DELETE_TRANSACTION, deleteTransactionSaga);
}
