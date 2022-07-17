// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import {getFirestore} from 'firebase/firestore';
import {getAuth}from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ0sJ6O6qinGlIIarObTZM_Iz4pV5XN7Y",
  authDomain: "hhsapp-a7ce9.firebaseapp.com",
  projectId: "hhsapp-a7ce9",
  storageBucket: "hhsapp-a7ce9.appspot.com",
  messagingSenderId: "633433868635",
  appId: "1:633433868635:web:3af3a08f06416cc869f27e",
  measurementId: "G-EVZZBX3K9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);