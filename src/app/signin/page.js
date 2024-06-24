"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/auth";
import Nav from "@/components/nav";
import Link from "next/link";
import Footer from "@/components/footer";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");

      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-indigo-300/60 h-screen">
      <Nav />
      <div className="flex items-center justify-center lg:mt-20 lg:scale-100 md:mt-8 scale-90 md:mb-10 lg:mb-20 mb-5">
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
            Sign in to your account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to sign in.
          </p>
          <div>
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
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="Email used to register"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
            <label
                htmlFor="password"
                className="text-gray-700 text-sm font-semibold mb-2 flex"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                Password 

                <div className="ml-2 cursor-pointer">
                  {passwordVisible ? (
                    <IoEyeOutline className="h-5 w-5 text-gray-700" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5 text-gray-700" />
                  )}
                </div>

              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none bg-indigo-200/60"
                required
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-150 ease-linear"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <Link href="/register" className="text-indigo-500 hover:underline">
                  Don't have an account? Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;