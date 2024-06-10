"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/nav";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/auth";
import { setAuthenticatedUser } from "@/firebase/authLogic";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // Ensure you have a password field for user creation

  const handleSubmitUser = async () => {
    if (!name || !email || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Add user data to Firestore
      const userCollectionRef = collection(db, "userDatabase");
      const userDocRef = doc(userCollectionRef, auth.currentUser.uid);
      await setDoc(userDocRef, {
        name,
        email,
        phone,
      });
      console.log("User Added");
      
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);

      // Set authenticated user state
      setAuthenticatedUser(true);

    } catch (error) {
      console.error("Error adding user:", error);
    }
    router.push("/");
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Nav />
      <div className="flex items-center justify-center mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create a new account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your details to register.
          </p>
          <div>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="James Brown"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="hello@alignui.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Phone Number *
              </label>
              <input
                type="number"
                id="phone"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="0123456789"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-150 ease-linear"
                onClick={handleSubmitUser}
              >
                <Link href="/">Register</Link>
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;