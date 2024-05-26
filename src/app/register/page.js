"use client"

import React, { use } from 'react'
import { useRouter } from 'next/navigation';
import Nav from '@/components/nav'
import { MdKeyboardArrowRight } from "react-icons/md";

// firebase imports
import { useEffect, useState } from "react";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase/auth";
import { signInWithGoogle } from "@/firebase/auth";

const page = () => {

    const router = useRouter();

    // New User States

  const [user, setUser] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState(0)
  
  const userCollectionRef = collection(db, 'users')

  const getUser = async () => {
    try {
      const data = await getDocs(userCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))   
      setUser(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(() => {
      getUser()
    }, [])

    const handleSubmitUser = async () => {
      try {
        await addDoc(userCollectionRef, {
          name: name,
          email: email,
          phone: phone,
          password: password
        })
        console.log('User Added')

        getUser()
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    
    <div className='bg-gray-100 h-screen'>
    <Nav />

    <div class="flex items-center justify-center mt-20">

    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div class="flex justify-center mb-6">
            <span class="inline-block bg-gray-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
            </span>
        </div>
        <h2 class="text-2xl font-semibold text-center mb-4">Create a new account</h2>
        <p class="text-gray-600 text-center mb-6">Enter your details to register.</p>
        
        <div>

            <div class="mb-4">
                <label for="fullName" class="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
                <input type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="James Brown" 
                onChange={(e) => setName(e.target.value)} />
            </div>

            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                <input type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@alignui.com" 
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Phone Number *</label>
                <input type="number" id='phone' class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="0123456789" 
                onChange={(e) => setPhone(Number(e.target.value))} />
            </div>

            {/* <button onClick={signInWithGoogle} className="hover:text-white ease-linear duration-200 border-[3px] 
            rounded-md pl-4 pr-3 py-1 border-indigo-500/90 hover:bg-indigo-500/90 flex items-center group text-indigo-500/90 hover:brightness-110">
                Sign up with Google
                <span className="text-indigo-500 mt-[2px] group-hover:translate-x-1 group-hover:text-white font-semibold transition ease-linear duration-150 text-[27px]">
                <MdKeyboardArrowRight />
                </span>
            </button> */}
                
            <button type="submit" class="w-full bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:brightness-90 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-150 ease-linear"
            onClick={handleSubmitUser}
            >
            Register
            </button>
            
        </div>
        </div>
    </div>
    </div>

  )
}

export default page