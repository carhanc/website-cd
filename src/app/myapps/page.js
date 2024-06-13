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
      <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-300 to-indigo-200 lg:mb-0 lg:px-32 lg:py-24 p-10">
        <div className="flex flex-col lg:text-left">
          <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-3xl inline">
            My Applications
          </p>
          <p className="lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-xl inline ">
            View and manage your submitted and saved applications here.
          </p>
        </div>
      </main>

      <div className="lg:px-32 py-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-500">Submitted Applications</h2>
        {submittedApplications.length > 0 ? (
          <div className='grid lg:grid-cols-2 gap-4'>
            {submittedApplications.map((app) => (
              <div key={app.id} className="relative mb-4 p-6 border border-gray-200 rounded-lg bg-white/50 max-h-56 overflow-hidden">
                <h2 className="text-2xl font-semibold">{app.job ? app.job : "No response"}</h2>
                <p><strong>Name:</strong> {app.name ? app.name : "No response"}</p>
                <p><strong>Date of Birth:</strong> {app.dob ? app.dob : "No response"}</p>
                <p><strong>Address:</strong> {app.address ? app.address : "No response"}</p>
                <p><strong>City:</strong> {app.city ? app.city : "No response"}</p>
                <p><strong>State / Country:</strong> {app.state ? app.state : "No response"}</p>
                <p><strong>Zip Code:</strong> {app.zip ? app.zip : "No response"}</p>
                <p><strong>Email:</strong> {app.email ? app.email : "No response"}</p>
                <p><strong>Phone:</strong> {app.phone ? app.phone : "No response"}</p>
                <p><strong>Title:</strong> {app.title ? app.title : "No response"}</p>
                <p><strong>Pronouns:</strong> {app.pronoun ? app.pronoun : "No response"}</p>
                <p><strong>Work Experience:</strong> {app.workExp ? app.workExp : "No response"}</p>
                <p><strong>Work Experience Qualifications:</strong> {app.workExpQual ? app.workExpQual : "No response"}</p>
                <p><strong>Undergraduate Information:</strong> {app.undergrad ? app.undergrad : "No response"}</p>
                <p><strong>Undergraduate Degree(s):</strong> {app.undergradDegree ? app.undergradDegree : "No response"}</p>
                <p><strong>Graduate Information:</strong> {app.grad ? app.grad : "No response"}</p>
                <p><strong>Graduate Degree(s):</strong> {app.gradDegree ? app.gradDegree : "No response"}</p>
                <p><strong>Skills:</strong> {app.skills ? app.skills : "No response"}</p>
                <p><strong>Qualifications from Skills:</strong> {app.skillsQual ? app.skillsQual : "No response"}</p>
                <p><strong>Any Additional Information:</strong> {app.other ? app.other : "No response"}</p>
                <p><strong>LinkedIn:</strong> {app.linkedin ? <Link target='_blank' href={app.linkedin}>{app.linkedin}</Link> : "No response"}</p>
                <p><strong>Resume:</strong> {app.resume ? <Link target='_blank' href={app.resume}>{app.resume}</Link> : "No response"}</p>

                <button onClick={() => handleShowMore(app)} className="absolute bottom-10 left-2 text-indigo-500 underline">Show More</button>

                <Link 
                  href={`/apply?form=${JSON.stringify(app)}`} 
                  className='px-2 py-1 border rounded-md border-black hover:text-white hover:bg-purple-500 transition ease-linear duration-300 absolute bottom-2 left-2'>
                  Edit Application
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No submitted applications found.</p>
        )}

        <h2 className="text-xl font-semibold mb-4 mt-8">Saved Applications</h2>
        {savedApplications.length > 0 ? (
          <div className='grid lg:grid-cols-2 gap-4'>
            {savedApplications.map((app) => (
              <div key={app.id} className="relative mb-4 p-6 border border-gray-200 rounded-lg bg-white/50 max-h-56 overflow-hidden">
                <h2 className="text-2xl font-semibold">{app.job ? app.job : "No response"}</h2>
                <p><strong>Name:</strong> {app.name ? app.name : "No response"}</p>
                <p><strong>Date of Birth:</strong> {app.dob ? app.dob : "No response"}</p>
                <p><strong>Address:</strong> {app.address ? app.address : "No response"}</p>
                <p><strong>City:</strong> {app.city ? app.city : "No response"}</p>
                <p><strong>State / Country:</strong> {app.state ? app.state : "No response"}</p>
                <p><strong>Zip Code:</strong> {app.zip ? app.zip : "No response"}</p>
                <p><strong>Email:</strong> {app.email ? app.email : "No response"}</p>
                <p><strong>Phone:</strong> {app.phone ? app.phone : "No response"}</p>
                <p><strong>Title:</strong> {app.title ? app.title : "No response"}</p>
                <p><strong>Pronouns:</strong> {app.pronoun ? app.pronoun : "No response"}</p>
                <p><strong>Work Experience:</strong> {app.workExp ? app.workExp : "No response"}</p>
                <p><strong>Work Experience Qualifications:</strong> {app.workExpQual ? app.workExpQual : "No response"}</p>
                <p><strong>Undergraduate Information:</strong> {app.undergrad ? app.undergrad : "No response"}</p>
                <p><strong>Undergraduate Degree(s):</strong> {app.undergradDegree ? app.undergradDegree : "No response"}</p>
                <p><strong>Graduate Information:</strong> {app.grad ? app.grad : "No response"}</p>
                <p><strong>Graduate Degree(s):</strong> {app.gradDegree ? app.gradDegree : "No response"}</p>
                <p><strong>Skills:</strong> {app.skills ? app.skills : "No response"}</p>
                <p><strong>Qualifications from Skills:</strong> {app.skillsQual ? app.skillsQual : "No response"}</p>
                <p><strong>Any Additional Information:</strong> {app.other ? app.other : "No response"}</p>
                <p><strong>LinkedIn:</strong> {app.linkedin ? <Link target='_blank' href={app.linkedin}>{app.linkedin}</Link> : "No response"}</p>
                <p><strong>Resume:</strong> {app.resume ? <Link target='_blank' href={app.resume}>{app.resume}</Link> : "No response"}</p>

                <button onClick={() => handleShowMore(app)} className="absolute bottom-10 left-2 text-indigo-500 underline">Show More</button>

                <Link 
                  href={`/apply?form=${JSON.stringify(app)}`} 
                  className='px-2 py-1 border rounded-md border-black hover:text-white hover:bg-purple-500 transition ease-linear duration-300 absolute bottom-2 left-2'>
                  Edit Application
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved applications found.</p>
        )}
      </div>

      {expandedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 w-11/12 max-w-4xl h-3/4 overflow-auto rounded-lg">
            <button onClick={handleClosePopup} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
            <h2 className="text-2xl font-semibold">{expandedApp.job ? expandedApp.job : "No response"}</h2>
            <p><strong>Name:</strong> {expandedApp.name ? expandedApp.name : "No response"}</p>
            <p><strong>Date of Birth:</strong> {expandedApp.dob ? expandedApp.dob : "No response"}</p>
            <p><strong>Address:</strong> {expandedApp.address ? expandedApp.address : "No response"}</p>
            <p><strong>City:</strong> {expandedApp.city ? expandedApp.city : "No response"}</p>
            <p><strong>State / Country:</strong> {expandedApp.state ? expandedApp.state : "No response"}</p>
            <p><strong>Zip Code:</strong> {expandedApp.zip ? expandedApp.zip : "No response"}</p>
            <p><strong>Email:</strong> {expandedApp.email ? expandedApp.email : "No response"}</p>
            <p><strong>Phone:</strong> {expandedApp.phone ? expandedApp.phone : "No response"}</p>
            <p><strong>Title:</strong> {expandedApp.title ? expandedApp.title : "No response"}</p>
            <p><strong>Pronouns:</strong> {expandedApp.pronoun ? expandedApp.pronoun : "No response"}</p>
            <p><strong>Work Experience:</strong> {expandedApp.workExp ? expandedApp.workExp : "No response"}</p>
            <p><strong>Work Experience Qualifications:</strong> {expandedApp.workExpQual ? expandedApp.workExpQual : "No response"}</p>
            <p><strong>Undergraduate Information:</strong> {expandedApp.undergrad ? expandedApp.undergrad : "No response"}</p>
            <p><strong>Undergraduate Degree(s):</strong> {expandedApp.undergradDegree ? expandedApp.undergradDegree : "No response"}</p>
            <p><strong>Graduate Information:</strong> {expandedApp.grad ? expandedApp.grad : "No response"}</p>
            <p><strong>Graduate Degree(s):</strong> {expandedApp.gradDegree ? expandedApp.gradDegree : "No response"}</p>
            <p><strong>Skills:</strong> {expandedApp.skills ? expandedApp.skills : "No response"}</p>
            <p><strong>Qualifications from Skills:</strong> {expandedApp.skillsQual ? expandedApp.skillsQual : "No response"}</p>
            <p><strong>Any Additional Information:</strong> {expandedApp.other ? expandedApp.other : "No response"}</p>
            <p><strong>LinkedIn:</strong> {expandedApp.linkedin ? <Link target='_blank' href={expandedApp.linkedin}>{expandedApp.linkedin}</Link> : "No response"}</p>
            <p><strong>Resume:</strong> {expandedApp.resume ? <Link target='_blank' href={expandedApp.resume}>{expandedApp.resume}</Link> : "No response"}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyApps;