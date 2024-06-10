import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx8taCaHiMwktCZs-BvzSIw0G-iZLyaTA",
  authDomain: "websitecd-3eecf.firebaseapp.com",
  projectId: "websitecd-3eecf",
  storageBucket: "websitecd-3eecf",
  messagingSenderId: "68990750874",
  appId: "1:68990750874:web:2b2e72e3b475be01214f23",
  measurementId: "G-70H2LX8ZQW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Local persistence set');
  })
  .catch((error) => {
    console.log('Error setting persistence', error);
  });

export const db = getFirestore(app);
export { auth };