// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDALhgMUA4ZAfYPCG8uxOSMOVXYF30MW6A",
  authDomain: "textutils-24cec.firebaseapp.com",
  projectId: "textutils-24cec",
  storageBucket: "textutils-24cec.appspot.com",
  messagingSenderId: "320849789299",
  appId: "1:320849789299:web:d9061702ae48ef91614506",
  measurementId: "G-Q1Z37TJD09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)