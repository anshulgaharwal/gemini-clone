// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDhnOmKVTtdl-jUyhl842iFarTpRL90pJo",
  authDomain: "sig-in-6bd93.firebaseapp.com",
  projectId: "sig-in-6bd93",
  storageBucket: "sig-in-6bd93.firebasestorage.app",
  messagingSenderId: "871104982699",
  appId: "1:871104982699:web:a55b93537806c5cb6ad1ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db };
