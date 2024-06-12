import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '../firebase/auth';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const AuthLogic = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthenticatedUser(user);
          } else {
            setAuthenticatedUser(null);
          }
        });
      })
      .catch((error) => {
        console.log('Error setting persistence', error);
      });
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        router.push("/");
        setAuthenticatedUser(null);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <strong className='ml-2'>
      {authenticatedUser ? (
        <Link
          href="/"
          onClick={signOutUser}
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110 text-extrabold"
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/register"
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110"
        >
          Sign Up
        </Link>
      )}
    </strong>
  );
};

export const fetchUserData = async (uid) => {
  const userDocRef = doc(db, 'userDatabase', uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

export default AuthLogic;