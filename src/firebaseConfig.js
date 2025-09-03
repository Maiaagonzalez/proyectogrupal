import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAl_M-802KaslU1-7T0EoE2HZvb-5M1oqE",
  authDomain: "proyectogrupal-237ff.firebaseapp.com",
  projectId: "proyectogrupal-237ff",
  storageBucket: "proyectogrupal-237ff.appspot.com",
  messagingSenderId: "806296406165",
  appId: "1:806296406165:web:af624b36ed229abb53b39c",
  measurementId: "G-MX036NF3GF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, googleProvider, db };