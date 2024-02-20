// components/JobCard.js
import React, { useState } from 'react';

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black p-4 border border-gray-800 rounded-lg shadow-md shadow-gray-900 m-2 text-indigo-500">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.pay}</p>
      <p className="text-sm text-gray-300 mt-2">Type: {job.type}</p>
      <p className="text-sm text-gray-300">Experience: {job.experience}</p>
      
      {/* Toggle between truncated and full description */}
      {!isExpanded ? (
        <p className="text-sm text-gray-300 overflow-ellipsis overflow-hidden h-12">{job.desc}</p>
      ) : (
        <>
          <p className="text-sm text-gray-300">{job.desc}</p>
          <p className="text-sm text-gray-300">Education: {job.edu}</p>
          <div>
            <h4 className="text-md font-semibold mt-4">Skills Required:</h4>
            <ul className="list-disc pl-5">
              {job.skills.map((skill, index) => (
                <li key={index} className="text-sm text-gray-300">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mt-4">Responsibilities:</h4>
            <ul className="list-disc pl-5">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="text-sm text-gray-300">{responsibility}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <button onClick={toggleExpanded} className="text-blue-600 hover:text-blue-800 mt-4">
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default JobCard;
