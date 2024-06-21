"use client"

// Data imports for the page to use
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import arhan from "../../public/img.jpeg"
import collaboration from "../../public/collaboration.jpg"
import innovation from "../../public/innovation.jpg"
import bowling from "../../public/bowling.jpg"
import promotion from "../../public/promotion.jpg"
import data from "../../public/data-deluge.jpg"
import data1 from "../../public/data.jpg"
import BenefitsCard from "@/components/BenefitsCard";
import sections from "../data/benefitsData"
import Footer from "@/components/footer";
import RegisterPage from "./register/page";
import { useState, useEffect } from "react";
import AuthLogic, {fetchUserData} from '@/firebase/authLogic';
import {auth} from '@/firebase/auth';
import ChatButton from "../components/ChatButton.js";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



// JSX Code / HTML returning the Landing Page with inline Tailwind CSS
// Tailwind CSS helps make the website responsive by specifying device-specific styles
const Home = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const data = await fetchUserData(auth.currentUser.uid);
        if (data) {
          setUserData(data);
          console.log(`User Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}`);
        }
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-100 to-indigo-300 lg:mb-0 lg:px-32 lg:py-20 p-10">
          <div className="flex flex-col lg:text-left">
            <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-3xl inline">
              Join the data deluge. Where <span className="inline text-indigo-400">curiosity</span> meets <span className="inline text-indigo-800">innovation</span>.
            </p>
          </div>
          <div className="flex lg:my-3 space-x-2">
            <Link
              className="rounded-md border-indigo-500 bg-indigo-500 text-white border w-fit px-4 py-2 hover:brightness-[1.15] transition ease-linear duration-300 flex flex-row group text-md lg:text-md"
              href="/apply"
            >
                  Apply
                <MdKeyboardArrowRight className="my-auto scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>
            <Link
              className="hover:bg-indigo-500 hover:text-white rounded-md z-40 border-indigo-500 text-indigo-600 border w-fit px-4 py-2 transition ease-linear duration-300 flex flex-row group text-md lg:text-md"
              href="/positions"
            >
                  View Open Positions
            </Link>

          </div>
      </main>
      

      {/* <div id='benefits' className="px-10 xl:px-12 lg:pt-10 pt-6">
        <h1 className="lg:mb-10 md:mb-10 mb-6 lg:text-3xl text-[25px] font-extrabold lg:text-left lg:mt-0 mt-4 text-indigo-500">Why Become a Voyager?</h1>
        <div className="grid xl:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <BenefitsCard key={benefit.title} {...benefit} />
          ))}
        </div>
        
      </div> */}

<div className="bg-indigo-50">
      <div className="lg:mb-0 mb-4 lg:px-32 p-10">
        <h1 className="text-2xl font-bold mb-8 text-indigo-800">Benefits</h1>
        {sections.map((section, index) => (
          <Disclosure key={index} defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-2 text-left text-xl font-medium text-indigo-900 bg-indigo-100 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  <span className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-200 flex items-center justify-center rounded-full">
                      <span className="text-indigo-500 font-bold text-xl">{section.icon}</span>
                    </div>
                    <span className="ml-4">{section.title}</span>
                  </span>
                  <ChevronUpIcon className={`${open ? 'hidden' : 'block'} w-5 h-5 text-indigo-500`} />
                  <ChevronDownIcon className={`${open ? 'block' : 'hidden'} w-5 h-5 text-indigo-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-700">
                  <div className="text-lg font-semibold mb-4 text-indigo-800">
                    {section.caption}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {section.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mt-1">
                          <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="ml-2">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>

    <div id='culture' className="px-10 xl:px-12 py-10 bg-white">
            <h1 className="text-grey-900 lg:mb-10 md:mb-10 mb-6 lg:text-3xl text-[25px] font-extrabold text-indigo-500 mt-10">
                The Voyager Culture
            </h1>
            <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={100 / 2}
                dynamicHeight={true}
                emulateTouch={true}
                swipeable={true}
            >
                <div className="p-4 h-full">
                    <div className="bg-indigo-900 rounded-lg overflow-hidden">
                    <Image src={innovation} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
                        {/* <Image src="/path/to/innovation.jpg" alt="Innovation" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500}/> */}
                    </div>
                    <div className="my-auto mt-4">
                        <h1 className="text-indigo-400 text-2xl font-bold mb-5">Innovation at Every Turn</h1>
                        <p className="text-gray-600 text-lg font-medium">At DataVoyagers, we believe that innovation isn&apos;t just a buzzword; it&apos;s the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
                    </div>
                </div>

                <div className="p-4 h-full">
                    <div className="bg-blue-900/10 rounded-lg overflow-hidden">
                    <Image src={innovation} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
                    </div>
                    <div className="my-auto mt-4">
                        <h1 className="text-indigo-400 text-2xl font-bold mb-5">Collaboration and Diversity:</h1>
                        <p className="text-gray-600 text-lg font-medium">We know that the best ideas come from the convergence of diverse perspectives. That&apos;s why we foster a collaborative environment where everyone&apos;s voice is heard and valued. Our team is made up of individuals from various backgrounds, each bringing their unique insights and experiences to the table.</p>
                    </div>
                </div>

                <div className="p-4 h-full">
                    <div className="bg-blue-900/10 rounded-lg overflow-hidden">
                    <Image src={innovation} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />

                        {/* <Image src="/path/to/promotion.jpg" alt="Empowerment" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500}/> */}
                    </div>
                    <div className="my-auto mt-4">
                        <h1 className="text-indigo-400 text-2xl font-bold mb-5">Empowerment and Growth</h1>
                        <p className="text-gray-600 text-lg font-medium">Our employees are our greatest asset, and we&apos;re committed to their professional and personal growth. We empower our team members with the resources, tools, and support they need to excel in their roles and advance in their careers. At DataVoyagers, you&apos;re not just joining a company; you&apos;re joining a path to future opportunities.</p>
                    </div>
                </div>

                <div className="p-4 h-full">
                    <div className="bg-blue-900/10 rounded-lg overflow-hidden">
                      
                        {/* <Image src="/path/to/bowling.jpg" alt="Work-Life Harmony" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500} /> */}
                    </div>
                    <div className="my-auto mt-4">
                        <h1 className="text-indigo-400 text-2xl font-bold mb-5">Work-Life Harmony</h1>
                        <p className="text-gray-600 text-lg font-medium">We understand that our employees have lives outside of work, and we believe that balance is essential for long-term happiness and productivity. Whether it&apos;s through flexible working arrangements, wellness programs, or social events, we&apos;re dedicated to ensuring our team members have the harmony they deserve.</p>
                    </div>
                </div>
            </Carousel>
        </div>
      <Footer />  
    </div>
  );
}

export default Home;
