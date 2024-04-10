import Image from 'next/image'
import React from 'react'

// Component for the Benefits Card that takes in the parameters, title, description, and image,
// from JSON data and displays them
export default function BenefitsCard({title, desc, img}) {
    return (

            <div class="text-center md:text-left hover:bg-violet-100 transition ease-linear duration-150 shadow-lg rounded-md">
                <div class="hover:bg-white/10 transition ease-linear font-medium bg-white/5 px-4 py-6 rounded-xl border-2 border-blue-100 flex lg:h-[19vh]">
                    <div className='rounded-md hidden lg:flex p-4 w-36 xl:mr-5'>
                        <Image src={`/${img}`} alt="icon" width={100} height={100} className="rounded-md h-fit w-fit" />
                    </div>
                    <div className='my-auto'>
                        <div class="font-bold text-xl text-indigo-400 mb-2">
                            {title}
                        </div>
                        <div class="text-md text-gray-600">
                            {desc}
                        </div>
                    </div>
                </div>
            </div>
    )
}