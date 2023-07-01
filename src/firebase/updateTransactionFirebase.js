import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateTransactionFirebase = async (transaction) => {
  const payload = { ...transaction };
  delete payload.id;
  await updateDoc(doc(db, "transactions", transaction.id), payload);
};
