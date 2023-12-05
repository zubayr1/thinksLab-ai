import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
   // "apiKey": process.env.REACT_APP_FIREBASE_API_KEY,
    // "authDomain": process.env.REACT_APP_FIREBASE_DOMAIN,
    // "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // "appId": process.env.REACT_APP_FIREBASE_APP_ID,
    // "measurementId": process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    // "databaseURL": ""

    apiKey: "AIzaSyBrxVq_5eHp5Qj0srtbQvyMe2NG8eewnuI",
  authDomain: "test-sandbox-bd290.firebaseapp.com",
  projectId: "test-sandbox-bd290",
  storageBucket: "test-sandbox-bd290.appspot.com",
  messagingSenderId: "474815277629",
  appId: "1:474815277629:web:6c98ae2e13003724679854",
  measurementId: "G-FH116V8MV8",
  }

// Initialize Firebase

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);


export { db, auth };