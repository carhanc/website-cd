import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '../firebase/auth';

const AuthLogic = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

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
        window.location.reload();
        setAuthenticatedUser(null);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      {authenticatedUser ? (
        <button
          onClick={signOutUser}
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/register"
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110"
        >
          Register
        </Link>
      )}
    </div>
  );
};

export default AuthLogic;