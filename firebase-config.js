// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXEvwkqW9aYM65WmEOgc6lRdHxpJt2xV4",
  authDomain: "atharav-spotify.firebaseapp.com",
  projectId: "atharav-spotify",
  storageBucket: "atharav-spotify.firebasestorage.app",
  messagingSenderId: "143462555192",
  appId: "1:143462555192:web:97df5e9a1ba8cf35a950cd",
  measurementId: "G-M88CNMKGVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);