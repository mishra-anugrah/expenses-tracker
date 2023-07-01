import { db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export const searchTransactionFirebase = async (queryString) => {
  const searchResults = [];
  const transactionsCollection = collection(db, "transactions");

  const q = query(
    transactionsCollection,
    where("title", ">=", queryString),
    where("title", "<=", queryString + "~")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => searchResults.push(doc.data()));

  return searchResults;
};
