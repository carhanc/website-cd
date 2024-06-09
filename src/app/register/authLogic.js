import { useState, useEffect } from 'react';
import { auth } from '@/firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

let setAuthenticatedUserState;

const AuthLogic = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  setAuthenticatedUserState = setAuthenticatedUser;

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
    return () => listenAuth();
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      {authenticatedUser ? (
        <Link
          href="/"
          onClick={signOutUser}
          className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-indigo-500/90 hover:brightness-110"
        >
          Logout
        </Link>
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

export const setAuthenticatedUser = (user) => {
  if (setAuthenticatedUserState) {
    setAuthenticatedUserState(user);
  }
};

export default AuthLogic;