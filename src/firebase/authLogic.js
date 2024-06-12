import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth, db } from '../firebase/auth';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { IoMdArrowDropdown } from "react-icons/io";

export const AuthLogic = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setAuthenticatedUser(user);
            const userDoc = await fetchUserData(user.uid);
            setUserData(userDoc);
          } else {
            setAuthenticatedUser(null);
            setUserData(null);
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
        setUserData(null);
      })
      .catch((error) => console.log('error', error));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {authenticatedUser ? (
        <div className="relative">
          <button
            className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110 flex"
            onClick={toggleDropdown}
          >
            Welcome, {userData?.name} 
            <IoMdArrowDropdown className='my-auto ml-1'/>
          </button>
          {dropdownOpen && (
            <div className=" fixed right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link href="/myapps" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  My Applications
                </Link>
                <button onClick={signOutUser} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href="/register" className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110">
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

export default AuthLogic;