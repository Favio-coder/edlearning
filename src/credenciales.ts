
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Asegúrate de importar esto

const firebaseConfig = {
    apiKey: "AIzaSyBLe-yKBGwmrEaYO5hm0EFL0duppYTY5T0",
    authDomain: "elearning-9aa54.firebaseapp.com",
    projectId: "elearning-9aa54",
    storageBucket: "elearning-9aa54.firebasestorage.app",
    messagingSenderId: "842086644129",
    appId: "1:842086644129:web:a72354fecdfff4854633e0"
  };

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar la autenticación (asegurándote de que este paso está presente)
const auth = getAuth(app);

// Inicializar Firestore
const db = getFirestore(app);

export { db, auth };  // Exportamos también la autenticación
