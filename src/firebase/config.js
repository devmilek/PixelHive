// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHUNn89UomPwwTXCittyoHRe1pspEi_Ig",
  authDomain: "pixelhive-2dd67.firebaseapp.com",
  projectId: "pixelhive-2dd67",
  storageBucket: "pixelhive-2dd67.appspot.com",
  messagingSenderId: "448861712461",
  appId: "1:448861712461:web:7ee1e4db3307c77660ac04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db }