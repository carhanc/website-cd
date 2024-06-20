"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (

      <div className="bg-white/50 p-5 rounded-md hover:bg-indigo-100 transition ease-linear duration-150 shadow-xl text-indigo-800">
        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
        <p className="text-sm text-black overflow-ellipsis overflow-hidden h-fit mb-1">{job.desc}</p>
        <p className="text-sm text-indigo-600 font-medium lg:mt-0 mt-2">{job.pay}</p>

          <p className="text-sm text-gray-600 font-medium mt-1"><span className='font-bold'>Type:</span> {job.type}</p>
          <p className="text-sm text-gray-600 font-medium mt-1"><span className='font-bold'>Experience:</span> {job.experience}</p>
        {/* Toggle between truncated and full description */}
        {!isExpanded ? (
          <div className='text-white'>.</div>
        ) : (
          <>
            <p className="text-sm text-gray-600 font-medium mt-1"><span className='font-bold'>Description:</span> {job.desc}</p>
            <p className="text-sm text-gray-600 font-medium mt-1"><span className='font-bold'>Education:</span> {job.edu}</p>
            <div>
              <h4 className="text-md font-semibold mt-4">Skills Required:</h4>
              <ul className="list-disc pl-5">
                {job.skills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-600">{skill}</li>
                ))}
              </ul>
            </div>
            <div className='mb-6'>
              <h4 className="text-md font-semibold mt-4">Responsibilities:</h4>
              <ul className="list-disc pl-5">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-sm text-gray-600">{responsibility}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        <div className='flex justify-between'>
          <button onClick={toggleExpanded} className='w-fit hover:underline transition ease-linear duration-200'>{isExpanded ? 'Show Less' : 'Show More'}</button>
          <Link href={`/apply?selectedJob=${job.title}`} className='px-2 py-1 border rounded-md border-indigo-500 hover:text-white hover:bg-indigo-500 transition ease-linear duration-300'>Apply &rarr;</Link>
        </div> 
        </div>

  );
};

export default JobCard;
