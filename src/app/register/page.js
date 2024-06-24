"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/nav";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "@/firebase/auth";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Footer from "@/components/footer";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [adminCode, setAdminCode] = useState("");

  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Full Name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }
    // if (!phone) {
    //   errors.phone = "Phone Number is required.";
    // } else if (phone.length !== 10) {
    //   errors.phone = "Phone Number must be 10 digits.";
    // }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (adminCode && adminCode !== "adminDV") {
      errors.adminCode = "Admin code doesn't exist.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitUser = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const authLevel = adminCode === "adminDV" ? "admin" : "user";

      const userCollectionRef = collection(db, "userDatabase");
      const userDocRef = doc(userCollectionRef, user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        // phone,
        authLevel,
      });
      console.log("User Added");
      router.push("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-indigo-300/60 h-screen">
      <Nav />
      <div className="flex items-center justify-center lg:mt-20 lg:scale-100 md:mt-8 scale-90 md:mb-10 lg:mb-12 mb-5">
        <div className="bg-indigo-100 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-indigo-200 rounded-full p-3">
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
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="ex. James Brown"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="flex text-gray-700 text-sm font-semibold mb-2"
              >
                Email Address <span className="text-xs text-gray-700 flex items-end ml-2">(Must be a valid email)</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="ex. jamesb@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="phone"
                className="text-gray-700 text-sm font-semibold mb-2 flex"
              >
                Phone Number <span className="text-xs text-gray-600 flex items-end ml-2">(10 characters long)</span>
              </label>
              <input
                type="number"
                id="phone"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="ex. 0123456789"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div> */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-semibold mb-2 flex"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                Password 

                <div className="ml-2 cursor-pointer">
                  {passwordVisible ? (
                    <IoEyeOffOutline className="h-5 w-5 text-gray-700" />
                  ) : (
                    <IoEyeOutline className="h-5 w-5 text-gray-700" />
                  )}
                </div>

                <span className="text-xs text-gray-600 flex items-end ml-2">(Must be at least 6 characters)</span>  

              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="ex. datavoyagers"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="adminCode"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Admin Code (if any)
              </label>
              <input
                type="text"
                id="adminCode"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                placeholder="Enter admin code if you have one"
                onChange={(e) => setAdminCode(e.target.value)}
              />
              {errors.adminCode && <p className="text-red-500 text-xs mt-1">{errors.adminCode}</p>}
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
      <Footer />
    </div>
  );
};

export default RegisterPage;