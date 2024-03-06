import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBiiRhdjmztxfcvsbRjNDO6mAbArjzsQgs",
  authDomain: "thinklabsai-official.firebaseapp.com",
  projectId: "thinklabsai-official",
  storageBucket: "thinklabsai-official.appspot.com",
  messagingSenderId: "1041201703664",
  appId: "1:1041201703664:web:2c735902d8256531417035",
  measurementId: "G-6QSN2TEJ3R"

  
  }

// Initialize Firebase

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);


export { db, auth };