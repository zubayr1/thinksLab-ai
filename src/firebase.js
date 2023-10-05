import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    "apiKey": "AIzaSyDF7uc5gIMMGvXQcOJ_DGLxmJmG1fx-EdM",
    "authDomain": "sandboxec-a94bb.firebaseapp.com",
    "projectId": "sandboxec-a94bb",
    "storageBucket": "sandboxec-a94bb.appspot.com",
    "messagingSenderId": "425389143083",
    "appId": "1:425389143083:web:d4a37d024b350c8fade66e",
    "measurementId": "G-RGQQ1RXXH4",
    "databaseURL": ""
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;