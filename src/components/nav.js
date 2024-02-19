"use client"

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import logo from "../../public/logo.png"

import { Divide as Hamburger1 } from 'hamburger-react'
import { useState } from 'react'

const Nav = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="sticky top-0 z-40 rounded-t-none ease-linear duration-200 p-5 border-b-2 border-blue-900/40 opacity-95 backdrop-blur-xl"
    >
      <Disclosure
        as="nav"
        className="w-full space-x-4 rounded-xl px-4 py-0"
      >
        {({ open }) => (
          <nav className="flex justify-between space-x-8 rounded-xl flex-col">
            
              <div className="flex flex-row justify-between xl:mx-16">
                
                <Link href='/' className="gap-2 sm:flex text-[22px] rounded-md p-2 
                font-semibold hover:scale-105 cursor-pointer ease-linear duration-150 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                  <Image
                    className="relative w-14 lg:mt-[-4px] mt-[-2px]"
                    alt="NextGen Logo"
                    placeholder="blur"
                    draggable="false"
                    src={logo}
                  />
                    <p className="my-auto sm:block hidden font-extrabold">DataVoyagers Careers</p>
                </Link>

                {/* Mobile Open/Close Btn */}
                <Disclosure.Button
                  className="rounded-xl p-2 text-white hover:text-gray-300 sm:hidden scale-90">
                  <Hamburger1 toggled={isOpen} toggle={setOpen} />
                </Disclosure.Button>

                {/* Desktop Links */}
                <div className="hidden gap-x-12 sm:flex text-[22px] my-auto rounded-md p-2 font-semibold bg-gradient-to-r from-blue-600 via-violet-500 to-indigo-400 text-transparent bg-clip-text">

                  <Link href="/about" className="mr-1 hover:text-blue-500 hover:font-bold ease-linear duration-200">
                      About
                  </Link>

                  <Link href="/positions" className="hover:text-violet-400 hover:font-bold ease-linear duration-300">
                      Positions
                  </Link>

                  <Link href="/contact" className="hover:text-indigo-300 hover:font-bold ease-linear duration-300">
                      Apply
                  </Link>
                
                </div>
              </div>


            {/* Mobile Links */}
            <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-100"
                enterTo="transform scale-100"
                leave="transition duration-250 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="relative"
              >                
                <div
                  className="mt-2 mb-4 border-t border-gray-800/40 sm:hidden h-[120px] py-4"
                >
                  <div className="mt-2 flex flex-col space-y-4">

                    <Link href="/about" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        About
                      </Disclosure.Button>
                    </Link>

                    <Link href="/positions" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Positions
                      </Disclosure.Button>
                    </Link>

                    <Link href="/contact" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Apply
                      </Disclosure.Button>
                    </Link>

                  </div>
                </div>
              </Transition>

          </nav>
        )}
      </Disclosure>
    </motion.div>
  );
};

export default Nav;
