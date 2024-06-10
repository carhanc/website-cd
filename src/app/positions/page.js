"use client"

import React from 'react'
import Nav from "../../components/nav";
import jobs from '@/data/jobData';
import JobCard from '../../components/JobCard'
import Footer from '@/components/footer'
import { useState } from 'react';
import AuthLogic, {fetchUserData} from '@/firebase/authLogic';
import {auth} from '@/firebase/auth';
import { useEffect } from 'react';

const Page = () => {

  const [titleFilter, setTitleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [userData, setUserData] = useState(null);

  // Function to clear all filters
  const clearFilters = () => {
    setTitleFilter('');
    setSkillFilter('');
    setLocationFilter('');
    setExperienceFilter('');
  };

  // Filter jobs based on the filters inputted on the frontend
  // Returns an array of job objects that match the filters
  const filteredJobs = jobs.filter(job => {
    return (
      (titleFilter ? job.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
      (skillFilter ? job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase())) : true) &&
      (locationFilter ? job.location === locationFilter : true) &&
      (experienceFilter ? job.experience === experienceFilter : true)
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const data = await fetchUserData(auth.currentUser.uid);
        if (data) {
          setUserData(data);
          console.log(`User Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}`);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className=' bg-indigo-100/60'>
        <Nav />
        <main className="lg:flex flex-cols-2 justify-evenly text-slate-800 bg-indigo-100/60">
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:pt-[12vh] pt-[10vh] lg:h-[30vh]  mb-14 md:px-20 space-y-6 p-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-indigo-500">Open Positions</h1>
              <p className="text-xl lg:text-3xl lg:text-left font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent lg:mx-0 lg:pb-4 pb-2">
                Check here for frequently updated open positions. Search and filter our list to find the perfect fit for you.
              </p>
            </div>
        </main>

      <div className='lg:flex p-10 justify-center items-center text-center gap-5 text-md lg:text-lg border-t-2 border-gray-400 gap-x-6'>
        <input
          className='w-full p-3 bg-white/60 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search job titles..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          className='w-full p-3 bg-white/60 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search skills..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className='w-full p-3 bg-white/60 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer'
        >
          <option value="" disabled className='text-zinc-400'>Select Location</option>
          <option value="Remote" className='text-black'>Remote</option>
          <option value="Hybrid" className='text-black'>Hybrid</option>
        </select>
        <select
          className='w-full p-3 bg-white/60 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer'
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="" disabled className='text-zinc-400'>Select Experience</option>
          <option value="Entry" className='text-black'>Entry</option>
          <option value="Mid" className='text-black'>Mid</option>
          <option value="Senior" className='text-black'>Senior</option>
        </select>
        <button
          onClick={clearFilters}
          className='p-3 border-white border-2 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-sm focus:ring-opacity-50'
        >
          Clear
        </button>
      </div>
      <div className='flex justify-center'>
        
      </div>
      {/* Map returning JobCard components to display the filtered jobs from the user query */}
      <div className='grid lg:grid-cols-2 lg:p-10 md:p-8 p-4 h-full bg-white'>
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
