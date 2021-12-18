import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCeKO-V80h3fLogdOZT1ddMeir5qMi7EdA",
  authDomain: "image-sorter-32bce.firebaseapp.com",
  projectId: "image-sorter-32bce",
  storageBucket: "image-sorter-32bce.appspot.com",
  messagingSenderId: "270271145351",
  appId: "1:270271145351:web:527dbbf764d74e739b1f22",
  measurementId: "G-N6MF3037MY"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const fstorage = firebase.storage();
export const fAuth = firebase.auth();