import React from 'react'

export default function BenefitsCard({title, desc}) {
    return (

        <div>

            <div class="pt-6 md:p-8 text-center md:text-left hover:">
                <div class="font-medium bg-blue-800 p-10 rounded-xl border-4 border-blue-500">
                    <div class="font-bold text-xl text-blue-100 mb-2">
                        {title}
                    </div>
                    <div class="text-md text-aqua-500">
                        {desc}
                    </div>
                </div>
            </div>

        </div>
    )
}