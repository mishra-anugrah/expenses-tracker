import { db } from "./firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const fetchAllTransactions = () => {
  const q = query(collection(db, "transactions"));
  onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  });
};
