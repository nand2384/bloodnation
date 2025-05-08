// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // if you use authentication

const firebaseConfig = {
  apiKey: "AIzaSyBPfKdXMk5Kp5AaxwMLwNkGnxM2B_j9VW4",
  authDomain: "bloodnation-6c07d.firebaseapp.com",
  databaseURL: "https://bloodnation-6c07d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bloodnation-6c07d",
  storageBucket: "bloodnation-6c07d.firebasestorage.app",
  messagingSenderId: "175940932562",
  appId: "1:175940932562:web:c2ebd0bc33f6cc293fee0b",
  measurementId: "G-536X317T5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app); // optional, only if you're using auth

export { db, auth };