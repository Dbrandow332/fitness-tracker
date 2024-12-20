import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxN5jGC6tAZrE4GitsF3wwLbcND82VW5I",
    authDomain: "workout-app-b552f.firebaseapp.com",
    projectId: "workout-app-b552f",
    storageBucket: "workout-app-b552f.firebasestorage.app",
    messagingSenderId: "322196749405",
    appId: "1:322196749405:web:fac4bbeaa311a3bfda61b4",
    measurementId: "G-LF884H2HHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;