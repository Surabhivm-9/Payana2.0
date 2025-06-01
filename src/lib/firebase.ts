
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmLQhyUHWYkDBem7vRkkoLlV7dNuXSAyM",
  authDomain: "payana1.firebaseapp.com",
  projectId: "payana1",
  storageBucket: "payana1.firebasestorage.app",
  messagingSenderId: "1062844030823",
  appId: "1:1062844030823:web:b1c5c580d6aca78f4b19c2",
  measurementId: "G-F3M7W8SR6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
