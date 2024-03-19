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

export default function Home() {
  return (
    <div>
      <Nav />
      
      <main className="lg:flex flex-col justify-center items-center text-black bg-white text-center">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[15vh] pt-[10vh] lg:h-[30vh] lg:mb-0 mb-14 md:px-20 space-y-6">
            <p className="font-extrabold lg:mx-0 lg:pb-4 pb-2 text-4xl lg:text-5xl text-center">
              Explore the data deluge with DataVoyagers<br /> where curiosity meets innovation
            </p>
          </div>
            
            <Link
            className="rounded-full z-50 lg:ml-2 border-indigo-400 text-indigo-600 border-2 w-fit px-4 py-2 my-3 hover:brightness-90 transition ease-linear duration-300 flex flex-row group lg:text-lg"
            href="/positions"
            >
                View Open Positions
              <MdKeyboardArrowRight className="mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>

          <div className="justify-center -space-x-8 items-center text-center lg:flex mb-20 hidden">
            <div className="w-1/3 lg:block hidden mb-4 scale-90 -rotate-[14deg]">
              <Image src={data1} className="object-cover h-full rounded-lg" />
            </div>
            <div className="w-1/3 lg:block hidden mb-20">
              <Image src={data} className="object-cover h-full rounded-lg" />
            </div>
          </div>
      </main>
      

      <div className="px-10 xl:px-12 py-10">
        <h1 className=" mb-10 text-3xl font-bold lg:text-left text-center text-indigo-500">Why Become a Voyager?</h1>
        <div className="grid xl:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <BenefitsCard key={benefit.title} {...benefit} />
          ))}
        </div>
        
      </div>

      <div className="px-10 xl:px-12 py-10 bg-white">
        
        <h1 className="text-grey-900 mb-10 text-3xl font-bold text-indigo-500">The Voyager Culture</h1>

        <div className="grid lg:grid-cols-2 gap-10">
            
          <div className="hidden lg:block bg-blue-900/10 rounded-lg">
            <Image src={innovation} className="object-cover max-h-72 rounded-lg" />
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-600 text-lg font-medium">At DataVoyagers, we believe that innovation isn't just a buzzword; it's the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Collaboration and Diversity:</h1>
            <p className="text-gray-600 text-lg font-medium">We know that the best ideas come from the convergence of diverse perspectives. That's why we foster a collaborative environment where everyone's voice is heard and valued. Our team is made up of individuals from various backgrounds, each bringing their unique insights and experiences to the table.</p>
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg">
            <Image src={collaboration} className="object-cover max-h-72 rounded-lg" />
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg">
            <Image src={promotion} className="object-cover max-h-72 rounded-lg" />
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Empowerment and Growth</h1>
            <p className="text-gray-600 text-lg font-medium">Our employees are our greatest asset, and we're committed to their professional and personal growth. We empower our team members with the resources, tools, and support they need to excel in their roles and advance in their careers. At DataVoyagers, you're not just joining a company; you're joining a path to future opportunities.</p>
          </div>

          <div className="my-auto">
            <h1 className="text-indigo-400 text-2xl font-bold mb-5">Work-Life Harmony</h1>
            <p className="text-gray-600 text-lg font-medium">We understand that our employees have lives outside of work, and we believe that balance is essential for long-term happiness and productivity. Whether it's through flexible working arrangements, wellness programs, or social events, we're dedicated to ensuring our team members have the harmony they deserve.</p>
          </div>

          <div className="hidden lg:block bg-blue-900/10 rounded-lg">
            <Image src={bowling} className="object-cover max-h-72 rounded-lg" />
          </div>

        </div>
        
      </div>
      <Footer />  
    </div>
  );
}
