import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";
import { BiRightArrowAlt } from "react-icons/bi";
import arhan from "../../public/img.jpg"

export default function Home() {
  return (
    <div>
      <Nav />
      
      <main className="lg:flex flex-cols-2 justify-evenly text-[#00E0FF]">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[25vh] pt-[10vh] lg:h-[50vh] lg:mb-0 mb-14 lg:min-h-[80vh] md:px-20 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">DataManiancs</h1>
            <p className="text-xl lg:text-3xl font-semibold bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent lg:mx-0 mx-10 lg:pb-4 pb-2">
              Turning Dreams into Pixels: Your Idea, Our Expertise.
            </p>
            <Link
              className="rounded-md lg:ml-4 border-blue-400 border-2 w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group lg:text-lg"
              href="/about"
            >
              Learn more here 
              <BiRightArrowAlt className="mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>
          </div>

        <div className="rounded-lg lg:w-1/3 lg:flex flex-col text-center lg:text-left justify-center lg:h-[50vh] lg:min-h-[80vh] lg:py-20 gap-x-10 lg:pr-10 lg:mx-0 mx-8">
          <Image src={arhan} className="object-cover h-full rounded-lg" />
        </div>
      </main>

    </div>
  );
}
