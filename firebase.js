// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// import {
//   getFirestore, doc, getDoc, getDocs, onSnapshot, collection
// }
// from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDjUdmtGMcsSF4ubw09KdxSb5vhl74FOyI",
    authDomain: "block-4af6e.firebaseapp.com",
    databaseURL: "https://block-4af6e-default-rtdb.firebaseio.com",
    projectId: "block-4af6e",
    storageBucket: "block-4af6e.appspot.com",
    messagingSenderId: "345214968643",
    appId: "1:345214968643:web:8a831bbcc2b6e876b085f6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore();
  // console.log(db);
  export {db};

export default app;
