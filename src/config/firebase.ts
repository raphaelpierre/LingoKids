import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvEtpCiulJh1uU3EbAIpuMeD-o6HaSo_4",
  authDomain: "lingokids-d75c3.firebaseapp.com",
  projectId: "lingokids-d75c3",
  storageBucket: "lingokids-d75c3.firebasestorage.app",
  messagingSenderId: "619636509180",
  appId: "1:619636509180:web:6a66256d3fe94065be0a79",
  measurementId: "G-67C5PQH3S8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);