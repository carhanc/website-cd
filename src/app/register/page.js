"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/nav";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "@/firebase/auth";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Full Name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }
    if (!phone) {
      errors.phone = "Phone Number is required.";
    } else if (phone.length !== 10) {
      errors.phone = "Phone Number must be 10 digits.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitUser = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userCollectionRef = collection(db, "userDatabase");
      const userDocRef = doc(userCollectionRef, user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        phone,
      });
      console.log("User Added");
      router.push("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Nav />
      <div className="flex items-center justify-center lg:mt-20 lg:scale-100 md:scale-125 md:mt-32 scale-90">
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
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                placeholder="hello@datavoyagers.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password *
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-xl mt-6 my-auto"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <div className=""><IoEyeOutline /></div>
                ) : (
                  <div><IoEyeOffOutline /></div>
                )}
              </span>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-150 ease-linear"
              onClick={handleSubmitUser}
            >
              Register
            </button>
              
            <div className="mt-4 text-center">
              <Link href="/signin" className="text-indigo-500 hover:underline">
                Already have an account? Login
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;