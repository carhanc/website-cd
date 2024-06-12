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
import { useSearchParams } from 'next/navigation';

const Page = () => {

  const searchParams = useSearchParams();
  let type = searchParams.get("type");

  const [titleFilter, setTitleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState(type ? type : '');
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
    <div className=''>
      <div className=' bg-indigo-100/60'>
        <Nav />
        <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-300 to-indigo-200 lg:mb-0 lg:px-32 lg:py-24 p-10">
          <div className="flex flex-col lg:text-left">
            <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-3xl inline">
              Open Positions
            </p>
            <p className="lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-xl inline ">
              Check here for frequently updated open positions. Search and filter our list to find the perfect fit for you.
            </p>
          </div>
        </main>

      <div className='lg:flex p-10 lg:px-32 justify-center items-center text-center gap-5 text-md lg:text-lg gap-x-2 bg-indigo-100 lg:space-y-0 space-y-3'>
        <input
          className='border border-indigo-50 text-sm w-full p-3 bg-white/50 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search job titles..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          className='border border-indigo-50 text-sm w-full p-3 bg-white/50 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          type="text"
          placeholder="Search skills..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className='border border-indigo-50 text-sm w-full p-3 bg-white/50 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer'
        >
          <option value=""  className='text-zinc-400'>Select Location</option>
          <option value="Remote" className='text-black'>Remote</option>
          <option value="Hybrid" className='text-black'>Hybrid</option>
        </select>
        <select
          className='border border-indigo-50 text-sm w-full p-3 bg-white/50 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer'
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value=""  className='text-zinc-400'>Select Experience</option>
          <option value="Entry" className='text-black'>Entry</option>
          <option value="Mid" className='text-black'>Mid-level</option>
          <option value="Senior" className='text-black'>Senior</option>
        </select>
        <button
          onClick={clearFilters}
          className='p-3 bg-indigo-500 rounded-md text-white text-sm w-full lg:w-fit hover:bg-indigo-400 ease-linear duration-300'
        >
          Clear
        </button>
      </div>
      <div className='flex justify-center'>
        
      </div>
      {/* Map returning JobCard components to display the filtered jobs from the user query */}
      <div className='px-10 py-8 pb-10 lg:px-32 grid lg:grid-cols-2 h-full gap-4 bg-indigo-50'>
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
