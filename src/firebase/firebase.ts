import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCTknLb3nEdYQOFitkMoHKt_wicQCS-Wo",
  authDomain: "advanced-virtual-interns-ecb1a.firebaseapp.com",
  projectId: "advanced-virtual-interns-ecb1a",
  storageBucket: "advanced-virtual-interns-ecb1a.firebasestorage.app",
  messagingSenderId: "184160362279",
  appId: "1:184160362279:web:919b50633c6ad9aa6d1302",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore (for later use with saved books, etc.)
export const db = getFirestore(app);

export default app;
