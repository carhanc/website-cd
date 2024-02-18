import React from 'react'

export default function BenefitsCard({ title, pay, skills, desc, type, edu, responsibilities, qualifications, benefits, location, experience }) {
	return (

		<div>

			<div className="md:p-8 text-center md:text-left">
				<div className="font-medium bg-gradient-to-r from-violet-900/15 via-indigo-900/70 to-purple-900/55 p-10 rounded-2xl opacity-70 
				border-4 border-purple-500/30">
					<div className='text-md text-gray-400 space-y-3 text-lg'>

						<div className='ml-2'>
							<div className='text-gray-400 font-semibold text-md mb-4'>
								We are looking for a new...
							</div>
							<div class="text-3xl text-blue-400/80 font-bold mb-6">
								{title}
							</div>
						</div>

						<div className='bg-blue-900/30 lg:h-[50vh] h-[40vh] rounded-2xl sm:block hidden'>
								
						</div>
						<div class="text-xl text-blue-200">
							<span className='font-bold'>Job Description:</span> {desc}
						</div>
						<div class=" ">
							Responsibilities: {responsibilities}
						</div>
						<div class=" ">
							Qualifications: {qualifications}
						</div>
						<div class=" ">
							Education Required: {edu}
						</div>
						<div class=" ">
							Skills Required: {skills}
						</div>
						<div class=" ">
							Benfits: {benefits}
						</div>
						<div class="font-bold text-lg text-green-500">
							Pay Range: {pay}
						</div>
						<div class=" ">
							Job Type: {type}
						</div>
						<div class=" ">
							Work Location: {location}
						</div>
						<div class=" ">
							Experience Level: {experience}
						</div>

					</div>
				</div>
			</div>

		</div>
	)
}