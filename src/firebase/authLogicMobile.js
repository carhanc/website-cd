import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '../firebase/auth';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const AuthLogicMobile = () => {
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
    <div className='ml-2'>
      {authenticatedUser ? (
        <div className='flex flex-col'>
          <Link
          href="/myapps"
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500 font-semibold mb-3"
        >
          My Applications
        </Link>
          <Link
          href="/"
          onClick={signOutUser}
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500 font-semibold"
        >
          Logout
        </Link>
        </div>
      ) : (
        <Link
          href="/register"
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500 hover:brightness-110 font-semibold"
        >
          Sign Up
        </Link>
      )}
    </div>
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

export default AuthLogicMobile;