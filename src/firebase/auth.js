import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx8taCaHiMwktCZs-BvzSIw0G-iZLyaTA",
  authDomain: "websitecd-3eecf.firebaseapp.com",
  projectId: "websitecd-3eecf",
  storageBucket: "websitecd-3eecf.appspot.com",
  messagingSenderId: "68990750874",
  appId: "1:68990750874:web:2b2e72e3b475be01214f23",
  measurementId: "G-70H2LX8ZQW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      console.log(error);
    });
}

export const db = getFirestore(app);