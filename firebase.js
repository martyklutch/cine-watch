// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAphtZGKN64wTm0cH3s3xNTqqh5Akx1cxI",
  authDomain: "cinewatch-4263e.firebaseapp.com",
  projectId: "cinewatch-4263e",
  storageBucket: "cinewatch-4263e.firebasestorage.app",
  messagingSenderId: "31936265544",
  appId: "1:31936265544:web:8f93b969b807917d55477d",
  measurementId: "G-ESLH0PNWWB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);