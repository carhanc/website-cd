"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import logo from "../../public/logo.png";

import { Divide as Hamburger1 } from "hamburger-react";
import { useState } from "react";
import AuthLogic from "@/firebase/authLogic";
import AuthLogicMobile from "@/firebase/authLogicMobile";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="sticky top-0 rounded-t-none ease-linear duration-200 p-3 backdrop-blur-xl z-50 bg-indigo-100/60"
    >
      <Disclosure as="nav" className="w-full space-x-4 rounded-xl px-4 py-0">
        {({ open }) => (
          <nav className="flex justify-between space-x-3 rounded-xl flex-col">
            <div className="flex flex-row justify-between xl:mx-16">
              <Link
                href="/"
                className="gap-2 sm:flex text-lg rounded-md p-2 font-semibold hover:scale-105 cursor-pointer ease-linear duration-150 text-gray-700 text-transparent bg-clip-text"
              >
                <Image
                  className="relative w-10 lg:mt-[-4px] mt-[4px] brightness-125 scale-90"
                  alt="NextGen Logo"
                  placeholder="blur"
                  draggable="false"
                  src={logo}
                />
                <p className="my-auto sm:block hidden font-bold text-indigo-500">
                  DataVoyagers Careers
                </p>
              </Link>

              {/* Mobile Open/Close Btn */}
              <Disclosure.Button className="rounded-xl p-2 text-indigo-500 hover:text-indigo-500 sm:hidden scale-90">
                <Hamburger1 toggled={isOpen} toggle={setOpen} />
              </Disclosure.Button>

              {/* Desktop Links */}
              <div className="hidden gap-x-10 sm:flex text-md my-auto rounded-md p-2 font-light text-indigo-700 text-transparent bg-clip-text">
                <Link
                  href="/#about"
                  className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-black hover:brightness-110"
                >
                  About
                </Link>
                <Link
                  href="/#benefits"
                  className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-black hover:brightness-110"
                >
                  Benefits
                </Link>
                <Link
                  href="/positions"
                  className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-black hover:brightness-110"
                >
                  Positions
                </Link>

                <Link
                  href="/apply"
                  className="my-auto hover:scale-105 ease-linear duration-150 hover:text-indigo-500 text-black hover:brightness-110"
                >
                  Apply
                </Link>

                <AuthLogic />
                
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
              <div className="first-letter:sm:hidden py-4">
                <div className="mt-2 flex flex-col space-y-4">
                  <Link href="/positions" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-indigo-500"
                    >
                      Positions
                    </Disclosure.Button>
                  </Link>
                  <Link href="/apply" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-indigo-500"
                    >
                      Apply
                    </Disclosure.Button>
                  </Link>

                  {/* <Link href="/myapps" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-indigo-500"
                    >
                      My Applications
                    </Disclosure.Button>
                  </Link> */}

                  <AuthLogicMobile />
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