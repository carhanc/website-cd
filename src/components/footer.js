import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from '@/firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import logo from "../../public/logo.png";

const navigation = {
  about: [
    { name: "Benefits", href: "/#benefits" },
    { name: "Work Culture", href: "/#culture" },
  ],
  positions: [
    { name: "Senior", href: "/positions?type=Senior" },
    { name: "Mid-level", href: "/positions?type=Mid" },
    { name: "Entry", href: "/positions?type=Entry" },
  ],
  social: [
    {
      name: "Facebook",
      href: "",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const [authLevel, setAuthLevel] = useState(null);

  useEffect(() => {
    const fetchAuthLevel = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'userDatabase', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAuthLevel(userData.authLevel);
        }
      }
    };
    fetchAuthLevel();
  }, []);

  const renderApplySection = () => {
    if (authLevel === "user") {
      return (
        <div>
          <h3 className="text-md font-semibold leading-6 text-indigo-700">
            Apply
          </h3>
          <ul role="list" className="mt-6 space-y-4">
            <li>
              <Link
                href="/apply"
                className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
              >
                Application
              </Link>
            </li>
            <li>
              <Link
                href="/myapps"
                className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
              >
                My Applications
              </Link>
            </li>
          </ul>
        </div>
      );
    } else if (authLevel === "admin") {
      return (
        <div>
          <h3 className="text-md font-semibold leading-6 text-indigo-700">
            Apply
          </h3>
          <ul role="list" className="mt-6 space-y-4">
            <li>
              <Link
                href="/apply"
                className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
              >
                Application
              </Link>
            </li>
            <li>
              <Link
                href="/adminpanel"
                className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
      );
    } else
      return (
        <div>
          <h3 className="text-md font-semibold leading-6 text-indigo-700">
            Apply
          </h3>
          <ul role="list" className="mt-6 space-y-4">
            <li>
              <Link
                href="/apply"
                className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
              >
                Application
              </Link>
            </li>
          </ul>
        </div>
      );
  };

  return (
    <footer className="bg-indigo-100" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-16 pb-8 pt-16 sm:pt-24 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Link href='/' className="space-x-3 flex-row flex text-lg rounded-md 
              font-semibold cursor-pointer ease-linear duration-300">
            <Image
              className="relative lg:w-9 lg:h-9 h-8 w-8 brightness-125 mt-2"
              alt="SciLynk Logo"
              placeholder="blur"
              draggable="false"
              src={logo}
            />
            <p className="mt-3 md:block text-indigo-700">DataVoyagers Careers</p>
          </Link>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-md font-semibold leading-6 text-indigo-700">
                  About
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-md leading-6 text-indigo-500 duration-200 hover:font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6 text-indigo-700 mt-10 md:mt-0">
                  Positions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.positions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-md leading-6 text-indigo-500  duration-200 hover:font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {renderApplySection()}
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-16 border-t border-indigo-600/40 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-indigo-500 hover:text-indigo-400 ease-linear transition"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-md leading-5 text-indigo-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} DataVoyagers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}