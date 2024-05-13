// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwNOZmBK6VpqkMNIjBD2mH2UR-JAcZ2MI",
  authDomain: "to-do-app-2b128.firebaseapp.com",
  projectId: "to-do-app-2b128",
  storageBucket: "to-do-app-2b128.appspot.com",
  messagingSenderId: "537401261837",
  appId: "1:537401261837:web:afe593ceea2db30b323a44",
  measurementId: "G-Q5RT8EM306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);