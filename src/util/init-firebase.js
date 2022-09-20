import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5UrMBtLs0upZu6NzcUj5jF4V2ZTCmfjU",
  authDomain: "chefly-fceb3.firebaseapp.com",
  projectId: "chefly-fceb3",
  storageBucket: "chefly-fceb3.appspot.com",
  messagingSenderId: "144954506188",
  appId: "1:144954506188:web:d4be2f35982e28f66dbb69",
  measurementId: "G-6RJHEZPVY5",
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
