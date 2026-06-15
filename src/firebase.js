// src/firebase.js
// Konfigurasi Firebase untuk project Pendaftaran-PPDB
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Ganti dengan Firebase config dari project "Pendaftaran-PPDB" Anda
// Dapatkan config dari: Firebase Console → Project Settings → General → Your apps → Config
const firebaseConfig = {
  apiKey: "AIzaSyAHX9VUT3e7HNTinfKffNPsMJNye75Snww",
  authDomain: "pendaftaran-ppdb-d7191.firebaseapp.com",
  projectId: "pendaftaran-ppdb-d7191",
  storageBucket: "pendaftaran-ppdb-d7191.firebasestorage.app",
  messagingSenderId: "334332379359",
  appId: "1:334332379359:web:436dc2dbfc50553930a96a",
  measurementId: "G-9JMCXNB4RX"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db };
