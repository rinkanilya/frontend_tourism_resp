import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAemWJ8v2pOJcR4qWXjy00owPhbj4cj00Q",
  authDomain: "e-7ouloul-352009.firebaseapp.com",
  projectId: "e-7ouloul-352009",
  storageBucket: "e-7ouloul-352009.appspot.com",
  messagingSenderId: "980832533865",
  appId: "1:980832533865:web:422b5182b6395ca2a6d1f8",
  measurementId: "G-RFMZYDWVV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage= getStorage(app)
