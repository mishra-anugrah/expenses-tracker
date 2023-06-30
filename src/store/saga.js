import { call, takeEvery, put, take } from "redux-saga/effects";
import { setTransactions, addTransaction } from "./transactionsSlice";
import { sagaActions } from "./sagaActions";
import { postTransaction } from "../firebase/addExpenseFirestore";

export function* storeTransaction(action) {
  try {
    let result = yield call(() => postTransaction(action.payload));
    yield put(addTransaction(result));
  } catch (error) {
    yield put({ type: sagaActions.SET_TRANSACTIONS_FAILED });
  }
}

// export function* fetchTransactions() {
//     try{

//     } catch() {
//         yield put({type: sagaActions.FETCH_TRANSACTIONS_FAILED})
//     }
// }

export default function* rootSaga() {
  yield takeEvery(sagaActions.SET_TRANSACTIONS, storeTransaction);
}
