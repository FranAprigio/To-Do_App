// Import the functions you need from the SDKs you need
import { initializeApp, getApps} from "firebase/app";
import {initializeAuth, getReactNativePersistence, getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwNOZmBK6VpqkMNIjBD2mH2UR-JAcZ2MI",
  authDomain: "to-do-app-2b128.firebaseapp.com",
  projectId: "to-do-app-2b128",
  storageBucket: "to-do-app-2b128.appspot.com",
  messagingSenderId: "537401261837",
  appId: "1:537401261837:web:afe593ceea2db30b323a44"
};

let auth;
if (getApps().length == 0) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
}else {
    auth = getAuth();
}


export default auth;
