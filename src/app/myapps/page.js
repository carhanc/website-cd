"use client"

import React, { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import { auth } from '@/firebase/auth';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/auth";
import Link from 'next/link';
import Footer from '@/components/footer';

const MyApps = () => {
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [savedApplications, setSavedApplications] = useState([]);
  const [expandedApp, setExpandedApp] = useState(null); // State for expanded application

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch submitted applications
          const submittedQuery = query(collection(db, "submittedApplications"), where("uid", "==", user.uid));
          const submittedSnapshot = await getDocs(submittedQuery);
          const submittedApps = submittedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSubmittedApplications(submittedApps);
  
          // Fetch saved applications
          const savedQuery = query(collection(db, "savedApplications"), where("uid", "==", user.uid));
          const savedSnapshot = await getDocs(savedQuery);
          const savedApps = savedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSavedApplications(savedApps);
        }
      } catch (error) {
        console.error("Error fetching applications: ", error);
      }
    };
  
    fetchApplications();
  }, []);

  const handleShowMore = (app) => {
    setExpandedApp(app);
  };

  const handleClosePopup = () => {
    setExpandedApp(null);
  };

  return (
    <div className='bg-indigo-100/60'>
      <Nav />
      <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-300 to-indigo-200 lg:mb-0 lg:px-32 lg:py-20 p-10">
        <div className="flex flex-col lg:text-left">
          <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-2xl lg:text-3xl inline">
            My Applications
          </p>
          <p className="lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-xl inline ">
            View and manage your submitted and saved applications here.
          </p>
        </div>
      </main>

      <div className="lg:px-32 lg:py-10 lg:grid lg:grid-cols-2 gap-24 p-8">
        
        <div>

          <h2 className="text-2xl ml-1 font-bold underline mb-4 text-indigo-500">Submitted Applications</h2>
          {submittedApplications.length > 0 ? (
            <div className='gap-4'>
              <div className='shadow-xl relative mb-4 border border-gray-200 rounded-md bg-white/50'>
              {submittedApplications.map((app) => (
                  <div key={app.id} className="">
                    <div className='pl-6 pt-5 text-md'>
                    <h2 className="text-xl font-bold mb-2 ml-0 text-indigo-800">{app.job ? app.job : "No response"}</h2>
                    <div className='space-y-[2px] ml-1'>
                      <p>Name: {app.name ? app.name : "No response"}</p>
                      <p>Date of Birth: {app.dob ? app.dob : "No response"}</p>
                      <p>Address: {app.address ? app.address : "No response"}</p>
                      <p>City: {app.city ? app.city : "No response"}</p>
                      <p>State / Country: {app.state ? app.state : "No response"}</p>
                      <p>Zip Code: {app.zip ? app.zip : "No response"}</p>
                      <p className='mb-5'>Email: {app.email ? app.email : "No response"}</p>
                    </div>
                  </div>

                  <div>
                    <button onClick={() => handleShowMore(app)} className="bg-indigo-500 px-3 py-2 rounded-md my-auto ease-linear duration-150 hover:brightness-[1.15] ml-7 mb-6 text-white mt-4">
                      Show More
                    </button>
                  </div>

                </div>
                
              ))}
              </div>
            </div>
          ) : (
            <p>No submitted applications found.</p>
          )}

        </div>
        
        <div>

          <h2 className="text-2xl ml-1 font-bold mb-4 underline text-indigo-500">Saved Applications</h2>
          {savedApplications.length > 0 ? (
            <div className='gap-4'>
              <div className='shadow-xl relative mb-4 border border-gray-200 rounded-md bg-white/50'>
              {savedApplications.map((app) => (
                  <div key={app.id} className="">
                    <div className='pl-6 pt-5 text-md'>
                    <h2 className="text-xl font-bold mb-2 ml-0 text-indigo-800">{app.job ? app.job : "No response"}</h2>
                    <div className='space-y-[2px] ml-1'>
                      <p>Name: {app.name ? app.name : "No response"}</p>
                      <p>Date of Birth: {app.dob ? app.dob : "No response"}</p>
                      <p>Address: {app.address ? app.address : "No response"}</p>
                      <p>City: {app.city ? app.city : "No response"}</p>
                      <p>State / Country: {app.state ? app.state : "No response"}</p>
                      <p>Zip Code: {app.zip ? app.zip : "No response"}</p>
                      <p className='mb-5'>Email: {app.email ? app.email : "No response"}</p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div>
                      <button onClick={() => handleShowMore(app)} className="bg-indigo-500 px-3 py-2 rounded-md my-auto ease-linear duration-150 hover:brightness-[1.15] ml-7 mb-6 text-white mt-4">
                        Show More
                      </button>
                    </div>

                    <Link 
                      href={`/apply?form=${JSON.stringify(app)}`} 
                      className='border border-indigo-500 px-3 py-2 rounded-md my-auto ease-linear duration-150 
                      hover:bg-indigo-500 hover:text-white mb-6 text-indigo-500'>
                      Edit Application
                    </Link>
                  </div>

                </div>
                
              ))}
              </div>
            </div>
          ) : (
            <p>No saved applications found.</p>
          )}

          </div>
      </div>

      {expandedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 w-11/12 max-w-4xl h-3/4 overflow-auto rounded-lg">
            <button onClick={handleClosePopup} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
            <h2 className="text-2xl font-semibold">{expandedApp.job ? expandedApp.job : "No response"}</h2>
            <p>Name: {expandedApp.name ? expandedApp.name : "No response"}</p>
            <p>Date of Birth: {expandedApp.dob ? expandedApp.dob : "No response"}</p>
            <p>Address: {expandedApp.address ? expandedApp.address : "No response"}</p>
            <p>City: {expandedApp.city ? expandedApp.city : "No response"}</p>
            <p>State / Country: {expandedApp.state ? expandedApp.state : "No response"}</p>
            <p>Zip Code: {expandedApp.zip ? expandedApp.zip : "No response"}</p>
            <p>Email: {expandedApp.email ? expandedApp.email : "No response"}</p>
            <p>Phone: {expandedApp.phone ? expandedApp.phone : "No response"}</p>
            <p>Title: {expandedApp.title ? expandedApp.title : "No response"}</p>
            <p>Pronouns: {expandedApp.pronoun ? expandedApp.pronoun : "No response"}</p>
            <p>Work Experience: {expandedApp.workExp ? expandedApp.workExp : "No response"}</p>
            <p>Work Experience Qualifications: {expandedApp.workExpQual ? expandedApp.workExpQual : "No response"}</p>
            <p>Undergraduate Information: {expandedApp.undergrad ? expandedApp.undergrad : "No response"}</p>
            <p>Undergraduate Degree(s): {expandedApp.undergradDegree ? expandedApp.undergradDegree : "No response"}</p>
            <p>Graduate Information: {expandedApp.grad ? expandedApp.grad : "No response"}</p>
            <p>Graduate Degree(s): {expandedApp.gradDegree ? expandedApp.gradDegree : "No response"}</p>
            <p>Skills: {expandedApp.skills ? expandedApp.skills : "No response"}</p>
            <p>Qualifications from Skills: {expandedApp.skillsQual ? expandedApp.skillsQual : "No response"}</p>
            <p>Any Additional Information: {expandedApp.other ? expandedApp.other : "No response"}</p>
            <p>LinkedIn: {expandedApp.linkedin ? <Link target='_blank' href={expandedApp.linkedin}>{expandedApp.linkedin}</Link> : "No response"}</p>
            <p>Resume: {expandedApp.resume ? <Link target='_blank' href={expandedApp.resume}>{expandedApp.resume}</Link> : "No response"}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyApps;