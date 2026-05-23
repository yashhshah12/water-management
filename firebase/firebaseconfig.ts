// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSLtli0e2LNDRjXh9AlgFD1eGcrx-CTZU",
  authDomain: "water-management-a1bd0.firebaseapp.com",
  projectId: "water-management-a1bd0",
  storageBucket: "water-management-a1bd0.firebasestorage.app",
  messagingSenderId: "546077271739",
  appId: "1:546077271739:web:2b9f7a1a38a03ae1e2ab9e",
  measurementId: "G-P98WSD7QGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
