import { db } from "./firebase";
import { collection, query, getDocs } from "firebase/firestore";

export const fetchAllTransactions = async () => {
  const q = query(collection(db, "transactions"));
  const transactions = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => transactions.push(doc.data()));

  // onSnapshot(q, (querySnapshot) => {
  //   transactions.concat(querySnapshot.docs.map((doc) => doc.data()));
  // });

  return transactions;
};
