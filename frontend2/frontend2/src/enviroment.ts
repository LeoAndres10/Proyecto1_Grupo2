import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyB8UOtVodz6j8tzpUaMiTVy-gVLflGQvaE",
  authDomain: "inventariomegarepuestos.firebaseapp.com",
  projectId: "inventariomegarepuestos",
  storageBucket: "inventariomegarepuestos.firebasestorage.app",
  messagingSenderId: "547863468263",
  appId: "1:547863468263:web:b65219eee95e66537faa42"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;