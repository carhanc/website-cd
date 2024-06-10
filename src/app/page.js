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
import AuthLogic from "@/firebase/authLogic";
import Auth from "@/firebase/auth";
import RegisterPage from "./register/page";

// JSX Code / HTML returning the Landing Page with inline Tailwind CSS
// Tailwind CSS helps make the website responsive by specifying device-specific styles
const Home = () => {

  return (
    <div>
      <Nav />
      
      <div className="p-10 space-y-4">
      
      </div>

      <main className="lg:flex flex-col justify-center items-center text-indigo-600 bg-white text-center lg:mb-0 mb-4">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[12vh] pt-[8vh] lg:h-[28vh] lg:mb-0 mb-10 md:px-20 space-y-6">
            <p className="font-extrabold lg:mx-0 lg:pb-4 pb-2 text-4xl lg:text-5xl text-center">
              Explore the data deluge with DataVoyagers<br /> where curiosity meets innovation
            </p>
          </div>
            <div className="flex items-center justify-center lg:my-3">

              <Link
              className="rounded-full z-40 lg:ml-2 border-indigo-400 text-indigo-600 border-2 w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group lg:text-lg"
              href="/positions"
              >
                  View Open Positions
                <MdKeyboardArrowRight className="lg:mt-[5px] mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
              </Link>

            </div>
          <div className="justify-center -space-x-8 items-center text-center lg:flex lg:mb-10">
            <div className="w-1/3 lg:block hidden mb-4 scale-90 -rotate-[12deg]">
              <Image src={data1} className="object-cover h-full rounded-lg" />
            </div>
            <div className="w-1/3 lg:block hidden mb-20">
              <Image src={data} className="object-cover h-full rounded-lg" />
            </div>
          </div>
      </main>
      

      <div className="px-10 xl:px-12 lg:pt-10 pt-6">
        <h1 className="lg:mb-10 md:mb-10 mb-6 lg:text-3xl text-[25px] font-extrabold lg:text-left lg:mt-0 mt-4 text-indigo-500">Why Become a Voyager?</h1>
        {/* Mapping over the benefits array to display each benefit card component */}
        <div className="grid xl:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <BenefitsCard key={benefit.title} {...benefit} />
          ))}
        </div>
        
      </div>

      <div className="px-10 xl:px-12 py-10 bg-white">
        
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
      <Footer />  
    </div>
  );
}

export default Home;
