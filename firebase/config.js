
import { initializeApp } from "firebase/app";
import { getFirestore, collection,updateDoc, addDoc, setDoc, serverTimestamp, doc, getDoc, where, query, getDocs, deleteDoc} from "firebase/firestore";
import { getAuth, reload, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
   //your configs here
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
    reload,
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
