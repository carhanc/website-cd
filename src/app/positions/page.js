"use client"
import React, { use } from 'react'
import Nav from "../../components/nav";
import jobs from '@/data/jobData';
import JobCard from '../../components/JobCard'
import Footer from '@/components/footer';
import { useState } from 'react';
import Image from 'next/image';
import arhan from "../../../public/img.jpeg"

const page = () => {

  const [titleFilter, setTitleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const filteredJobs = jobs.filter(job => {
    return (
      (titleFilter ? job.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
      (skillFilter ? job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase())) : true) &&
      (locationFilter ? job.location === locationFilter : true) &&
      (experienceFilter ? job.experience === experienceFilter : true)
    );
  });

  return (
    <div>
      <div className='bg-gradient-to-br from-slate-200 via-zinc-500 to-gray-300'>
        <Nav />
        <main className="lg:flex flex-cols-2 justify-evenly text-slate-800 bg-gradient-to-br from-slate-200 via-zinc-500 to-gray-300">
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[16vh] pt-[10vh] lg:h-[50vh] lg:mb-0 mb-14 md:px-20 space-y-6 p-16">
              <h1 className="text-4xl lg:text-6xl font-bold">Open Positions</h1>
              <p className="text-slate-700 text-xl lg:text-3xl font-semibold bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent lg:mx-0 lg:pb-4 pb-2">
                Check here for frequently updated open positions. Search and filter our list to find the perfect fit for you.
              </p>
            </div>
        </main>

      <div className='grid grid-cols-1 lg:grid-cols-4 p-10 justify-center items-center text-centergap-5 text-md lg:text-lg 
      bg-gradient-to-r from-slate-300 to-gray-400 space-x-4'>
        <input
          className='p-3 bg-white/60 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search job titles..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          className='p-3 bg-white/60 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search skills..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className='p-3 bg-white/60 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
        >
          <option value="" disabled className='text-zinc-400'>Select Location</option>
          <option value="Remote" className='text-black'>Remote</option>
          <option value="Hybrid" className='text-black'>Hybrid</option>
        </select>
        <select
          className='p-3 bg-white/60 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="" disabled className='text-zinc-400'>Select Experience</option>
          <option value="Entry" className='text-black'>Entry</option>
          <option value="Mid" className='text-black'>Mid</option>
          <option value="Senior" className='text-black'>Senior</option>
        </select>
      </div>

      <div className='grid lg:grid-cols-2 p-10 h-full bg-white'>
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default page