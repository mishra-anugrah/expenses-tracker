import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const deleteTransactionFirebase = async (docId) => {
  await deleteDoc(doc(db, "transactions", docId));
};
