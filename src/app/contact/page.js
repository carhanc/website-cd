"use client"

import React from 'react'
import Nav from "../../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Listbox } from '@headlessui/react'
import { useState } from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const tabs = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Contact Information' },
  { id: 3, name: 'Academic / Work Experience' },
  { id: 4, name: 'Skills / Expertise' },
  { id: 5, name: 'Service & Rates' },
]

const page = () => {

  const [active, setActive] = useState(1);

  return (
    <div className=''>
      <Nav />
      
      <div className='text-gray-300 font-semibold text-2xl mx-16 mt-16'>
        New Job Application
      </div>

      <div className='bg-gray-800 m-16 p-10 py-16 rounded-xl lg:block hidden'>
        
        <div className='flex flex-row space-x-5 text-gray-300'>
          <div className='lg:w-1/4 w-1/4 flex flex-col lg:text-xl font-medium border-r-4 border-gray-900/50'>

            {tabs.map((tab) => (
              <button 
              className={`${active === tab.id ? "text-blue-300" : "text-gray-300"} 
              p-4 hover:bg-gray-600/60 transition ease-linear duration-150 rounded-2xl justify-between flex flex-row mx-5 mr-8 group`}
              onClick={() => setActive(tab.id)}
              >
                <span>
                  {tab.name}
                </span> 
                <span className='flex items-center text-[30px] hover:translate-x-3 group-hover:translate-x-1 transition ease-linear duration-100'>
                  <MdKeyboardArrowRight />
                </span>
              </button>
            ))}  

          </div>
          
          {/* Personal Information */}

          <div className={`${active === 1 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
            <span className='text-3xl font-semibold text-blue-300'>
              Personal Information
            </span>
            <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

              <div className='text-gray-300 text-lg flex flex-col mr-10'>
                <span className='ml-1'>Full Name</span>
                <input placeholder='ex. John Doe' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col'>
                <span className='ml-1'>Date of Birth</span>
                <input placeholder='ex. 01/15/2003' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Adress, City, State, Zip</span>
                <input placeholder='ex. 145 Maple Ave, Cupertino, CA, 94024' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>
              
              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Social Security Number (AAA-GG-SSSS) </span>
                <input placeholder='ex. 123-45-6789' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Mother Tongue</span>
                <input placeholder='ex. English' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10'>
                <span className='ml-1'>Nationality</span>
                <input placeholder='ex. Portuguese' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

            </div>
          </div>
          
          {/* Contact Information */}

          <div className={`${active === 2 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
            <span className='text-3xl font-semibold text-blue-300'>
              Contact Information
            </span>
            <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

              <div className='text-gray-300 text-lg flex flex-col mr-10'>
                <span className='ml-1'>Full Name</span>
                <input placeholder='ex. John Doe' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col'>
                <span className='ml-1'>Date of Birth</span>
                <input placeholder='ex. 01/15/2003' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Adress, City, State, Zip</span>
                <input placeholder='ex. 145 Maple Ave, Cupertino, CA, 94024' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>
              
              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Social Security Number (AAA-GG-SSSS) </span>
                <input placeholder='ex. 123-45-6789' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Mother Tongue</span>
                <input placeholder='ex. English' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10'>
                <span className='ml-1'>Nationality</span>
                <input placeholder='ex. Portuguese' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

            </div>
          </div>
          
          {/* Academic / Work Experience */}

          <div className={`${active === 3 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
            <span className='text-3xl font-semibold text-blue-300'>
              Academic / Work Experience
            </span>
            <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

              <div className='text-gray-300 text-lg flex flex-col mr-10'>
                <span className='ml-1'>Full Name</span>
                <input placeholder='ex. John Doe' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col'>
                <span className='ml-1'>Date of Birth</span>
                <input placeholder='ex. 01/15/2003' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Adress, City, State, Zip</span>
                <input placeholder='ex. 145 Maple Ave, Cupertino, CA, 94024' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>
              
              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Social Security Number (AAA-GG-SSSS) </span>
                <input placeholder='ex. 123-45-6789' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Mother Tongue</span>
                <input placeholder='ex. English' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10'>
                <span className='ml-1'>Nationality</span>
                <input placeholder='ex. Portuguese' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

            </div>
          </div>
          
          {/* Skills & Expertise */}

          <div className={`${active === 4 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
            <span className='text-3xl font-semibold text-blue-300'>
              Skills & Expertise
            </span>
            <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

              <div className='text-gray-300 text-lg flex flex-col mr-10'>
                <span className='ml-1'>Full Name</span>
                <input placeholder='ex. John Doe' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col'>
                <span className='ml-1'>Date of Birth</span>
                <input placeholder='ex. 01/15/2003' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Adress, City, State, Zip</span>
                <input placeholder='ex. 145 Maple Ave, Cupertino, CA, 94024' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>
              
              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Social Security Number (AAA-GG-SSSS) </span>
                <input placeholder='ex. 123-45-6789' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Mother Tongue</span>
                <input placeholder='ex. English' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10'>
                <span className='ml-1'>Nationality</span>
                <input placeholder='ex. Portuguese' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

            </div>
          </div>

          {/* Serivice and Rates */}

          <div className={`${active === 5 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
            <span className='text-3xl font-semibold text-blue-300'>
              Service and Rates
            </span>
            <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

              <div className='text-gray-300 text-lg flex flex-col mr-10'>
                <span className='ml-1'>Full Name</span>
                <input placeholder='ex. John Doe' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col'>
                <span className='ml-1'>Date of Birth</span>
                <input placeholder='ex. 01/15/2003' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Adress, City, State, Zip</span>
                <input placeholder='ex. 145 Maple Ave, Cupertino, CA, 94024' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>
              
              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Social Security Number (AAA-GG-SSSS) </span>
                <input placeholder='ex. 123-45-6789' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                <span className='ml-1'>Mother Tongue</span>
                <input placeholder='ex. English' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

              <div className='text-gray-300 text-lg flex flex-col mt-10'>
                <span className='ml-1'>Nationality</span>
                <input placeholder='ex. Portuguese' className='p-4 text-lg rounded-xl bg-gray-900/55 mt-3 outline-none text-gray-100' />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default page