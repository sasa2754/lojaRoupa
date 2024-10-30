// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // Importando isSupported
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbypJOBSr8fx8GYyCm34NnWCeoU4eoRYo",
  authDomain: "crudzinho-expo.firebaseapp.com",
  projectId: "crudzinho-expo",
  storageBucket: "crudzinho-expo.appspot.com",
  messagingSenderId: "254990006442",
  appId: "1:254990006442:web:5a330e68e00cd0fe97b8d3",
  measurementId: "G-950P6BMXH7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Inicializa o Analytics apenas se suportado
let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(FIREBASE_APP);
    } else {
        console.warn("Firebase Analytics is not supported in this environment.");
    }
});
