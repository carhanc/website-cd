import React from 'react'

export default function BenefitsCard({ title, pay, skills, desc, type, edu, responsibilities, qualifications, benefits, location, experience }) {
	return (

		<div>

			<div className="md:p-8 text-center md:text-left">
				<div className="font-medium bg-gradient-to-r from-slate-900 to-slate-700 p-10 rounded-2xl">
					<div className='text-md text-cyan-500 space-y-6 text-lg'>

						<div class="text-3xl font-bold underline">
							{title}
						</div>
						<div class=" text-xl">
							Job Description: {desc}
						</div>
						<div class="font-bold text-lg text-green-500">
							Pay Range: {pay}
						</div>
						<div class=" ">
							Skills Required: {skills}
						</div>
						<div class=" ">
							Job Type: {type}
						</div>
						<div class=" ">
							Education Required: {edu}
						</div>
						<div class=" ">
							Responsibilities: {responsibilities}
						</div>
						<div class=" ">
							Qualifications: {qualifications}
						</div>
						<div class=" ">
							Benfits: {benefits}
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