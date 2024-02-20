import Image from 'next/image'
import React from 'react'


export default function BenefitsCard({title, desc, img}) {
    return (

            <div class="text-center md:text-left">
                <div class="hover:bg-white/10 transition ease-linear font-medium bg-white/5 px-4 py-6 rounded-xl border-2 border-blue-900/40 flex">
                    <div className='rounded-md hidden lg:flex p-4 w-36 xl:mr-5'>
                        <Image src={`/${img}`} alt="icon" width={100} height={150} className="rounded-md" />
                    </div>
                    <div className='my-auto'>
                        <div class="font-bold text-xl text-blue-100 mb-2">
                            {title}
                        </div>
                        <div class="text-md text-gray-400">
                            {desc}
                        </div>
                    </div>
                </div>
            </div>
    )
}