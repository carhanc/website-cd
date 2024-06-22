"use client"

import React, { useState, useEffect } from 'react';
import Nav from "../../components/nav";
import jobs from '@/data/jobData';
import JobCard from '../../components/JobCard';
import Footer from '@/components/footer';
import AuthLogic, { fetchUserData } from '@/firebase/authLogic';
import { auth } from '@/firebase/auth';
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';

const Page = () => {
  const searchParams = useSearchParams();
  let type = searchParams.get("type");

  const [titleFilter, setTitleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [userData, setUserData] = useState(null);

  // Get all unique skills, titles, locations, and experiences from jobs data
  const allSkills = Array.from(new Set(jobs.flatMap(job => job.skills)));
  const allTitles = Array.from(new Set(jobs.map(job => job.title)));
  const allLocations = Array.from(new Set(jobs.map(job => job.location)));
  const allExperiences = ["Entry", "Mid", "Senior"];

  // Function to clear all filters
  const clearFilters = () => {
    setTitleFilter('');
    setSkillFilter([]);
    setLocationFilter([]);
    setExperienceFilter([]);
  };

  // Filter jobs based on the filters inputted on the frontend
  const filteredJobs = jobs.filter(job => {
    return (
      (titleFilter ? job.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
      (skillFilter.length ? skillFilter.every(skill => job.skills.includes(skill.value)) : true) &&
      (locationFilter.length ? locationFilter.some(location => job.location.includes(location.value)) : true) &&
      (experienceFilter.length ? experienceFilter.some(experience => job.experience.includes(experience.value)) : true)
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

  useEffect(() => {
    if (type) {
      setExperienceFilter([{ value: type, label: type }]);
    }
  }, [type]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e5e7eb',
      borderWidth: '1px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#a5b4fc',
      },
      padding: '2px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '0.375rem',
      fontSize: '1rem', // Smaller font size
      color: '#374151',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#a5b4fc',
      color: '#fff',
      fontSize: '0.75rem', // Smaller font size
      textAlign: 'left'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '0.75rem', // Smaller font size
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#374151',
      fontSize: '.85rem', // Smaller font size
      textAlign: 'left'
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: 'left', // Left-justified text
      fontSize: '0.75rem', // Smaller font size
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left', // Left-justified text
      fontSize: '0.75rem', // Smaller font size
      backgroundColor: state.isSelected ? '#a5b4fc' : provided.backgroundColor,
      color: state.isSelected ? '#fff' : provided.color,
      '&:hover': {
        backgroundColor: '#a5b4fc',
        color: '#fff',
      },
    }),
  };

  return (
    <div className=''>
      <div className=' bg-indigo-100/60'>
        <Nav />
        <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-300 to-indigo-200 lg:mb-0 lg:px-32 lg:py-20 p-10">
          <div className="flex flex-col lg:text-left">
            <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-2xl lg:text-3xl inline">
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
          <Select
            isMulti
            options={allSkills.map(skill => ({ value: skill, label: skill }))}
            value={skillFilter}
            onChange={setSkillFilter}
            styles={customStyles}
            placeholder="Search skills..."
            className='w-full'
          />
          <Select
            isMulti
            options={allLocations.map(location => ({ value: location, label: location }))}
            value={locationFilter}
            onChange={setLocationFilter}
            styles={customStyles}
            placeholder="Select Location"
            className='w-full'
          />
          <Select
            isMulti
            options={allExperiences.map(experience => ({ value: experience, label: experience }))}
            value={experienceFilter}
            onChange={setExperienceFilter}
            styles={customStyles}
            placeholder="Select Experience"
            className='w-full'
          />
          <button
            onClick={clearFilters}
            className='p-3 bg-indigo-500 rounded-md text-white text-sm w-full lg:w-fit hover:bg-indigo-400 ease-linear duration-300'
          >
            Clear
          </button>
        </div>
        <div className='flex justify-center'>
        </div>
        <div className='px-10 py-8 pb-10 lg:px-32 grid lg:grid-cols-2 h-full gap-8 bg-indigo-50'>
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page;
