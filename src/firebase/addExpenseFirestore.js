import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const postTransaction = async (transaction) => {
  try {
    const transactionsCollection = collection(db, "transactions");
    const docRef = await addDoc(transactionsCollection, transaction);
    console.log("new transaction added : ", docRef.id);
    return transaction;
  } catch (error) {
    console.error("aaaa", error);
  }
};
