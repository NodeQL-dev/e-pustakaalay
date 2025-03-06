import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbnaYYlwgCwjZhj5sNYVHmlIpaklw8-JQ",
    authDomain: "greek-books.firebaseapp.com",
    databaseURL: "https://greek-books-default-rtdb.firebaseio.com",
    projectId: "greek-books",
    storageBucket: "greek-books.appspot.com",
    messagingSenderId: "1092103248648",
    appId: "1:1092103248648:web:1c75f3bfb4626fbfa76abd",
    measurementId: "G-Y5JKYR4WRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };