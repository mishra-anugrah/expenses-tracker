import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const postTransactionFirebase = async (transaction) => {
  try {
    const transactionsCollection = collection(db, "transactions");
    const docRef = await addDoc(transactionsCollection, transaction);
    console.log("new transaction added : ", docRef.id);
    return { ...transaction, id: docRef.id };
  } catch (error) {
    console.error("aaaa", error);
  }
};
