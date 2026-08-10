import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Bura sizin mövcud Firebase konfiqurasiya məlumatlarınızdır
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);