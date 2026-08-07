import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4aYdivmqK0EDby6xQfLeARfJbUusqR2A",
  authDomain: "allbaffy.firebaseapp.com",
  projectId: "allbaffy",
  storageBucket: "allbaffy.firebasestorage.app",
  messagingSenderId: "1023235022746",
  appId: "1:1023235022746:web:69e12113b161e63af7e423",
  measurementId: "G-V2EJG9B97V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);