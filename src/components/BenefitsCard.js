import React from 'react'

export default function BenefitsCard({title, desc}) {
    return (

            <div class="text-center md:text-left">
                <div class="hover:bg-white/10 transition ease-linear font-medium bg-white/5 px-4 py-6 rounded-xl border-2 border-blue-900/40 flex">
                    <div className='rounded-md hidden lg:flex bg-blue-900/50 w-36 mr-5'>

                    </div>
                    <div>
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