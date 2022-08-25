import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjKyYaTXICETcQG2uiY2t5KdsvmSsvYo4",
  authDomain: "todoss-2e9e2.firebaseapp.com",
  projectId: "todoss-2e9e2",
  storageBucket: "todoss-2e9e2.appspot.com",
  messagingSenderId: "399325929227",
  appId: "1:399325929227:web:60583a2038ce6d7db4cc0e",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db
