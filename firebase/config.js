
import { initializeApp } from "firebase/app";
import { getFirestore, collection,updateDoc, addDoc, setDoc, serverTimestamp, doc, getDoc, where, query, getDocs, deleteDoc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const profile = 'profile'

export { firestore,
    auth, 
    storage, 
    profile,
    collection, 
    addDoc,
    serverTimestamp, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
    ref, 
    uploadBytes, 
    getDownloadURL,
    setDoc,
    doc,
    getDoc,
    where,
    query,
    updateDoc,
    getDocs,
    deleteDoc,
};