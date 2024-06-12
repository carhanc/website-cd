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
import benefits from "../data/benefitsData"
import Footer from "@/components/footer";
import RegisterPage from "./register/page";
import { useState, useEffect } from "react";
import AuthLogic, {fetchUserData} from '@/firebase/authLogic';
import {auth} from '@/firebase/auth';
import ChatButton from "../components/ChatButton.js";


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
      <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-100 to-indigo-300 lg:mb-0 mb-4 lg:px-32 lg:py-24 p-10">
          <div className="flex flex-col lg:text-left">
            <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-3xl inline">
              Join the data deluge. Where <p className="inline text-indigo-400">curiosity</p> meets <p className="inline text-indigo-800">innovation</p>.
            </p>
          </div>
          <div className="flex lg:my-3 space-x-2">
            <Link
              className="rounded-sm z-40 border-indigo-500 bg-indigo-500 text-white border w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group text-sm lg:text-md"
              href="/apply"
            >
                  Apply
                <MdKeyboardArrowRight className="my-auto scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>
            <Link
              className="hover:bg-indigo-500 hover:text-white rounded-sm z-40 border-indigo-600 text-indigo-600 border w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group text-sm lg:text-md"
              href="/positions"
            >
                  View Open Positions
            </Link>

          </div>
      </main>
      

      <div id='benefits' className="px-10 xl:px-12 lg:pt-10 pt-6">
        <h1 className="lg:mb-10 md:mb-10 mb-6 lg:text-3xl text-[25px] font-extrabold lg:text-left lg:mt-0 mt-4 text-indigo-500">Why Become a Voyager?</h1>
        {/* Mapping over the benefits array to display each benefit card component */}
        <div className="grid xl:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <BenefitsCard key={benefit.title} {...benefit} />
          ))}
        </div>
        
      </div>

      <div id='culture' className="px-10 xl:px-12 py-10 bg-white">
        
        <h1 className="text-grey-900 lg:mb-10 md:mb-10 mb-6 lg:text-3xl text-[25px] font-extrabold text-indigo-500 mt-10">The Voyager Culture</h1>

        <div className="grid lg:grid-cols-2 gap-10">
            
          <div className="hidden lg:block bg-blue-900/10 rounded-lg overflow-hidden">
            <Image src={innovation} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-600 text-lg font-medium">At DataVoyagers, we believe that innovation isn&apos;t just a buzzword; it&apos;s the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Collaboration and Diversity:</h1>
            <p className="text-gray-600 text-lg font-medium">We know that the best ideas come from the convergence of diverse perspectives. That&apos;s why we foster a collaborative environment where everyone&apos;s voice is heard and valued. Our team is made up of individuals from various backgrounds, each bringing their unique insights and experiences to the table.</p>
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg overflow-hidden">
            <Image src={collaboration} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg overflow-hidden">
            <Image src={promotion} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Empowerment and Growth</h1>
            <p className="text-gray-600 text-lg font-medium">Our employees are our greatest asset, and we&apos;re committed to their professional and personal growth. We empower our team members with the resources, tools, and support they need to excel in their roles and advance in their careers. At DataVoyagers, you&apos;re not just joining a company; you&apos;re joining a path to future opportunities.</p>
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Work-Life Harmony</h1>
            <p className="text-gray-600 text-lg font-medium">We understand that our employees have lives outside of work, and we believe that balance is essential for long-term happiness and productivity. Whether it&apos;s through flexible working arrangements, wellness programs, or social events, we&apos;re dedicated to ensuring our team members have the harmony they deserve.</p>
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg overflow-hidden">
            <Image src={bowling} className="object-cover max-h-72 rounded-lg hover:scale-110 duration-200" />
          </div>

        </div>
        
      </div>
      {/* <ChatButton /> */}
      <Footer />  
    </div>
  );
}

export default Home;
