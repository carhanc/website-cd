import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";
import { BiRightArrowAlt } from "react-icons/bi";
import arhan from "../../public/img.jpeg"
import BenefitsCard from "@/components/BenefitsCard";
import benefits from "../data/benefitsData"
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      
      <main className="lg:flex flex-cols-2 justify-evenly text-[#00E0FF] bg-gradient-to-tr from-blue-900/40 via-black to-indigo-900/45">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[25vh] pt-[10vh] lg:h-[50vh] lg:mb-0 mb-14 lg:min-h-[80vh] md:px-20 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">Join our Voyage.</h1>
            <p className="text-xl lg:text-3xl font-semibold bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent lg:mx-0 lg:pb-4 pb-2">
              Dive into the data deluge with DataVoyagers. Where curiosity meets innovation.
            </p>
            <Link
              className="rounded-md lg:ml-2 border-blue-400 border-2 w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group lg:text-lg"
              href="/positions"
            >
              View Open Positions
              <BiRightArrowAlt className="mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>
          </div>

        <div className="rounded-lg lg:w-1/3 lg:flex flex-col text-center lg:text-left justify-center lg:h-[50vh] lg:min-h-[80vh] lg:py-20 gap-x-10 lg:pr-10 lg:mx-0 mx-8 opacity-90">
          <Image src={arhan} className="object-cover h-full rounded-lg" />
        </div>
      </main>

      <div className="px-10 xl:px-12 py-10 bg-gradient-to-br from-blue-900/40 via-black to-indigo-900/45">
        <h1 className="text-white mb-10 text-3xl font-bold">Why Become a Voyager?</h1>
        <div className="grid xl:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <BenefitsCard key={benefit.title} {...benefit} />
          ))}
        </div>
        
      </div>

      <div className="px-10 xl:px-12 py-10 bg-gradient-to-bl from-indigo-900/45 via-black to-indigo-900/45">
        <h1 className="text-white mb-10 text-3xl font-bold">The Voyager Culture</h1>
        <div className="grid xl:grid-cols-2 gap-y-10">
          <div>
            <h1 className="text-white text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-400 text-lg">At DataVoyagers, we believe that innovation isn't just a buzzword; it's the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>
          <div className="bg-blue-900/10 rounded-lg">
            
          </div>
          <div className="bg-blue-900/10 rounded-lg">
            
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-400 text-lg">At DataVoyagers, we believe that innovation isn't just a buzzword; it's the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-400 text-lg">At DataVoyagers, we believe that innovation isn't just a buzzword; it's the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>
          <div className="bg-blue-900/10 rounded-lg">
            
          </div>
          <div className="bg-blue-900/10 rounded-lg">
            
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold mb-5">Innovation at Every Turn</h1>
            <p className="text-gray-400 text-lg">At DataVoyagers, we believe that innovation isn't just a buzzword; it's the cornerstone of our success. We encourage our team to challenge the status quo, think outside the box, and embrace new ideas. Our culture thrives on creativity and the relentless pursuit of excellence.</p>
          </div>
        </div>
        
        
      </div>
      <Footer />  
    </div>
  );
}
