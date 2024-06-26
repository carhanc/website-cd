"use client"

// Data imports for the page to use
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import innovation from "../../public/innovation.jpg"
import collaboration from "../../public/collaboration.png"
import sections from "../data/benefitsData"
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { fetchUserData } from '@/firebase/authLogic';
import { auth } from '@/firebase/auth';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Typewriter from 'typewriter-effect';


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

    // Hero Section
    <div>
      <Nav />
      <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-100 to-indigo-300 lg:mb-0 lg:px-32 lg:py-20 p-10">

        <div className="flex justify-between">

          <div className="my-auto">
            <div className="flex lg:text-left lg:mb-0 mb-2">
              <div className="font-bold lg:mx-0 lg:pb-4 pb-2 text-2xl lg:text-3xl inline lg:flex gap-2">
                Join the data deluge. 
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 75,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Where <span className="inline text-indigo-300">analytics </span>transform<span className="inline text-indigo-800"> ideas</span>.')
                      .pauseFor(2500)
                      .deleteAll(30)
                      .typeString('Where insights <span className="inline text-indigo-300">fuel</span> innovation.')
                      .pauseFor(2500)
                      .deleteAll(30)
                      .typeString('Where data <span className="inline text-indigo-300">drives</span> discovery.')
                      .deleteAll(30)
                      .start();
                  }}
                />
                {/* Where <span className="inline text-indigo-500">curiosity</span> meets <span className="inline text-indigo-800">innovation</span>. */}
              </div>
            </div>

            <div className="flex lg:my-3 space-x-2 w-fit">
              <Link
                className="rounded-md border-indigo-500 bg-indigo-500 text-white border w-fit lg:px-4 lg:py-2 md:px-3 px-3 py-1 md:text-md hover:brightness-[1.15] transition ease-linear 
                duration-300 flex flex-row group text-md lg:text-md my-auto"
                href="/apply"
              >
                Apply
                <MdKeyboardArrowRight className="my-auto scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
              </Link>
              <Link
                className="hover:bg-indigo-500 hover:text-white rounded-md z-40 border-indigo-500 text-indigo-600 border w-fit lg:px-4 lg:py-2 md:px-3 px-3 py-1 md:text-md hover:brightness-[1.15] transition ease-linear duration-300 flex flex-row group text-md lg:text-md my-auto"
                href="/positions"
              >
                View Open Positions
              </Link>
            </div>
          </div>
          
          {/* <div className="lg:block hidden">
            <Image src={Rect} alt="DataVoyagers" className="object-cover rounded-lg" width={300} height={300} />
          </div> */}

        </div>

      </main>

      {/* About Section */}
      <div className="bg-indigo-50 lg:px-32 p-10 flex justify-between" id="about">
        <div className="lg:w-2/3 my-auto">
          <h1 className="text-2xl font-bold mb-8 text-indigo-800">About</h1>
          <p className="text-lg mb-6 text-indigo-900">
            DataVoyagers is committed to harnessing the power of data to drive innovation and solve real-world problems. Our mission is to empower businesses and individuals with cutting-edge data solutions that unlock new opportunities and create meaningful impact.
          </p>
          <p className="text-lg mb-6 text-indigo-900">
            We specialize in data analytics, machine learning, and artificial intelligence, providing comprehensive services from data collection and processing to advanced predictive modeling. Our team of experts is dedicated to delivering high-quality, customized solutions that meet the unique needs of our clients.
          </p>
          <p className="text-lg mb-6 text-indigo-900">
            At DataVoyagers, we believe in the transformative power of data and are passionate about helping our clients navigate the complexities of the digital age. Join us on a journey to explore the limitless possibilities of data-driven innovation.
          </p>
        </div>
        <div className="lg:block hidden w-1/4 my-auto">
            <Image src={collaboration} alt="DataVoyagers" className="object-cover" />
         </div>
        
      </div>

      {/* // Benefits Section */}
      <div className="bg-indigo-100/30" id="benefits">
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
                    <ChevronUpIcon className={`${!open ? 'hidden' : 'block'} w-5 h-5 text-indigo-500`} />
                    <ChevronDownIcon className={`${!open ? 'block' : 'hidden'} w-5 h-5 text-indigo-500`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-700">
                    <div className="text-lg font-semibold mb-4 text-indigo-800">
                      {section.caption}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 mb-3">
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

      {/* // Culture Section
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
              <Image src="/path/to/innovation.jpg" alt="Innovation" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500}/>
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

              <Image src="/path/to/promotion.jpg" alt="Empowerment" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500}/>
            </div>
            <div className="my-auto mt-4">
              <h1 className="text-indigo-400 text-2xl font-bold mb-5">Empowerment and Growth</h1>
              <p className="text-gray-600 text-lg font-medium">Our employees are our greatest asset, and we&apos;re committed to their professional and personal growth. We empower our team members with the resources, tools, and support they need to excel in their roles and advance in their careers. At DataVoyagers, you&apos;re not just joining a company; you&apos;re joining a path to future opportunities.</p>
            </div>
          </div>

          <div className="p-4 h-full">
            <div className="bg-blue-900/10 rounded-lg overflow-hidden">

              <Image src="/path/to/bowling.jpg" alt="Work-Life Harmony" className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" width={500} height={500} />
            </div>
            <div className="my-auto mt-4">
              <h1 className="text-indigo-400 text-2xl font-bold mb-5">Work-Life Harmony</h1>
              <p className="text-gray-600 text-lg font-medium">We understand that our employees have lives outside of work, and we believe that balance is essential for long-term happiness and productivity. Whether it&apos;s through flexible working arrangements, wellness programs, or social events, we&apos;re dedicated to ensuring our team members have the harmony they deserve.</p>
            </div>
          </div>
        </Carousel>
      </div> */}

      <Footer />
    </div>
  );
}

export default Home;