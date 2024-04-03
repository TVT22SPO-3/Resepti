
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDY3hGLDSJFczrepMVxllEsgPQuV1B-hO8",
  authDomain: "recipeapp-647ea.firebaseapp.com",
  projectId: "recipeapp-647ea",
  storageBucket: "recipeapp-647ea.appspot.com",
  messagingSenderId: "50741522804",
  appId: "1:50741522804:web:5cac4f31a7d78778353c21",
  measurementId: "G-02SF89D7Q9"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth(app);


export { firestore,
    auth, 
    collection, 
    addDoc,
    serverTimestamp, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
};