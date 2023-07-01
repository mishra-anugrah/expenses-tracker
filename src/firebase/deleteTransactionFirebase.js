import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const deleteTransactionFirebase = async (id) => {
  await deleteDoc(doc(db, "transactions", id));
};
