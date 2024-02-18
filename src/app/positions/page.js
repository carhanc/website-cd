import React from 'react'
import Nav from "../../components/nav";
import jobs from '@/data/jobData';
import JobCard from '../../components/JobCard'

const page = () => {
  return (
    <div>
      <Nav />
      
      <div>
        <div className='bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent 
        text-4xl font-semibold flex justify-center lg:text-left text-center mt-16 mb-8'>
          Job Availability
        </div>
        <div className='grid xl:grid-cols-2 p-10 h-full'>
          {jobs.map((job) => (
            <JobCard key={job.title} {...job} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default page