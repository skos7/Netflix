import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDu4-2y1w_-4nH0xMjrfY_g9uFrCeeAZXQ",
  authDomain: "netflix-c4394.firebaseapp.com",
  projectId: "netflix-c4394",
  storageBucket: "netflix-c4394.appspot.com",
  messagingSenderId: "604072204593",
  appId: "1:604072204593:web:48d49235d2d5a79fadb810"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
