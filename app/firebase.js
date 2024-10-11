// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZhoCa5c0UVvgRgV5DVdJWyl8Jh6wTz_c",
  authDomain: "habit-tracker-2b9c7.firebaseapp.com",
  projectId: "habit-tracker-2b9c7",
  storageBucket: "habit-tracker-2b9c7.appspot.com",
  messagingSenderId: "119556386795",
  appId: "1:119556386795:web:64447017e377f953fb33ae",
  measurementId: "G-7PZBE925VN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only in a browser environment
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
