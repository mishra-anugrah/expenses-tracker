// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvqersoow4QQwGrcwOEedlLDNvO9z7h2s",
  authDomain: "expenses-app-1f75c.firebaseapp.com",
  projectId: "expenses-app-1f75c",
  storageBucket: "expenses-app-1f75c.appspot.com",
  messagingSenderId: "851829136862",
  appId: "1:851829136862:web:0dff94b8ec01ea0fad514f",
  measurementId: "G-84M4RKRZNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
