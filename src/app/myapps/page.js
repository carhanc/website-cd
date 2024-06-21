"use client"

import React, { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import { auth } from '@/firebase/auth';
import { getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/auth";
import Link from 'next/link';
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "savedApplications", id));
      setSavedApplications(savedApplications.filter(app => app.id !== id));
    } catch (error) {
      console.error("Error deleting application: ", error);
    }
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
          <h2 className="text-2xl ml-1 font-bold mb-6 text-indigo-500">Saved Applications</h2>
          {savedApplications.length > 0 ? (
            <div className='gap-4'>
              <div className='relative mb-4 rounded-md space-y-10'>
                {savedApplications.map((app) => (
                  <div key={app.id} className="shadow-xl bg-white/50 border">
                    <div className='pl-6 pt-5 text-md'>
                      <h2 className="text-xl font-bold mb-2 ml-0 text-indigo-800 lg:block flex flex-col">
                        {app.job ? app.job : "No response"}
                        <span className='lg:ml-2 text-sm text-gray-500 italic font-medium'>
                          {app.savedAt ? `*Saved on: ${new Date(app.savedAt).toLocaleDateString()}*` : ""}
                        </span>
                      </h2>
                      <div className='space-y-[2px] ml-1'>
                        <p>Name: {app.name ? app.name : "No response"}</p>
                        <p>Date of Birth: {app.dob ? app.dob : "No response"}</p>
                        <p>Address: {app.address ? app.address : "No response"}</p>
                        <p>City: {app.city ? app.city : "No response"}</p>
                        <p>State / Country: {app.state ? app.state : "No response"}</p>
                        <p>Zip Code: {app.zip ? app.zip : "No response"}</p>
                        <p>Email: {app.email ? app.email : "No response"}</p>
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
                        hover:bg-indigo-500 hover:text-white mb-6 text-indigo-500 flex flex-row'>
                        <span className='lg:block hidden'>Edit Application</span>
                        <span className='my-auto lg:ml-2 lg:text-lg text-xl'><FaPencil /></span>
                      </Link>

                      <button onClick={() => handleDelete(app.id)} className="bg-red-500 lg:flex lg:flex-row px-3 py-2 rounded-md my-auto ease-linear duration-150 hover:brightness-90 mb-6 text-white">
                        <span className='lg:block hidden'>Delete</span>
                        <span className='my-auto lg:ml-2 lg:text-lg text-xl'><FaRegTrashCan /></span>
                      </button>
                    </div>

                  </div>

                ))}
              </div>
            </div>
          ) : (
            <p>No saved applications found.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl ml-1 font-bold mb-6 text-indigo-500 lg:mt-0 mt-8">Submitted Applications</h2>
          {submittedApplications.length > 0 ? (
            <div className=''>
              <div className='relative mb-4 rounded-md space-y-8'>
                {submittedApplications.map((app) => (
                  <div key={app.id} className=" bg-white/50 border shadow-lg">
                    <div className='pl-6 pt-5 text-md'>
                      <h2 className="text-xl font-bold mb-2 ml-0 text-indigo-800 lg:block flex flex-col">
                        {app.job[0] ? app.job[0] : "No response"}{app.job[1] ? "," : ""} {app.job[1]}{app.job[2] ? "," : ""} {app.job[2]}
                        <span className='lg:ml-2 text-sm text-gray-500 italic font-medium'>
                          {app.submittedAt ? `*Submitted on: ${new Date(app.submittedAt).toLocaleDateString()}*` : ""}
                        </span>
                      </h2>
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

      </div>

      {expandedApp && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center bg-white">
          <div className="relative bg-indigo-200/25 m-5 lg:m-10 lg:p-10 rounded-lg border-2 border-indigo-400/90 p-6 w-11/12 max-w-4xl h-3/4 overflow-auto bg-white">
            <button onClick={handleClosePopup} className="absolute top-2 right-2 text-xl font-bold text-indigo-600">&times;</button>
            <div className="text-white">
              <h2 className="lg:flex-none flex flex-col items-center font-extrabold text-xl lg:text-2xl lg:mb-12 text-indigo-700 lg:text-left md:text-left text-center lg:pt-0 pt-7 lg:flex lg:flex-row md:flex-row md:ml-7">
                Review Your Application:
                <h2 className="border-2 border-indigo-700/90 px-2 rounded-md border-dashed text-lg lg:text-2xl text-indigo-700/90 text-center lg:ml-2 w-fit">
                  {expandedApp.job[0] ? expandedApp.job[0] : "No response"}{expandedApp.job[1] ? "," : ""} {expandedApp.job[1]}{expandedApp.job[2] ? "," : ""} {expandedApp.job[2]}
                </h2>
              </h2>

              <div className="lg:ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 lg:mt-6 mt-8">Personal Information</h2>
                <div className="space-y-6 grid lg:grid-cols-2 text-white px-7 pb-7 lg:ml-7">
                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                    <span className="ml-1 mt-6 font-semibold">Full Name</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.name ? expandedApp.name : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Date of Birth</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.dob ? expandedApp.dob : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Address</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.address ? expandedApp.address : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">City</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.city ? expandedApp.city : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">State/Country</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.state ? expandedApp.state : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Zip Code</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none">
                      {expandedApp.zip ? expandedApp.zip : "No response"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 mt-8">Contact Information</h2>
                <div className="space-y-6 grid lg:grid-cols-2 text-white px-7 pb-7 lg:ml-7">
                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                    <span className="ml-1 mt-6 font-semibold">Email</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.email ? expandedApp.email : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Phone</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.phone ? expandedApp.phone : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Title</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.title ? expandedApp.title : "No response"}
                    </div>
                  </div>

                  <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10">
                    <span className="ml-1 font-semibold">Pronouns</span>
                    <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                      {expandedApp.pronoun ? expandedApp.pronoun : "No response"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 mt-8">Higher Education</h2>
                <div className="space-y-4 text-white px-7 pb-7 pt-3 lg:ml-7">

                  <div className="lg:grid grid-cols-2">

                    <div className='grid grid-rows-3'>
                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-4 font-semibold">Undergraduate Information</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.undergrad || "No response"}
                        </div>
                      </div>

                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-7 font-semibold">Undergraduate Major(s)</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.undergradMajor || "No response"}
                        </div>
                      </div>

                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-8 font-semibold">Undergraduate Degree(s)</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.undergradDegree || "No response"}
                        </div>
                      </div>

                    </div>

                    <div className='grid grid-rows-3'>

                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-6 lg:mt-0">
                        <span className="ml-1 mt-4 font-semibold">Graduate Information</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.grad || "No response"}
                        </div>
                      </div>

                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-2 lg:mt-0">
                        <span className="ml-1 mt-7 font-semibold">Graduate Major(s)</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.gradMajor || "No response"}
                        </div>
                      </div>

                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-8 font-semibold">Graduate Degree(s)</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.gradDegree || "No response"}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

              <div className="ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 mt-8">Previous Experience</h2>
                <div className="space-y-4 text-white px-7 pb-7 pt-3 lg:ml-7">
                  <div className="flex flex-col">
                    <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                      <span className="ml-1 mt-4 font-semibold">Work Experience</span>
                      <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                        {expandedApp.workExp ? expandedApp.workExp : "No response"}
                      </div>
                    </div>

                    <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                      <span className="ml-1 mt-8 font-semibold">Work Experience Qualifications</span>
                      <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                        {expandedApp.workExpQual ? expandedApp.workExpQual : "No response"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 mt-8">Skills / Expertise</h2>
                <div className="space-y-4 text-white px-7 pb-7 pt-3 lg:ml-7">
                  <div className="flex flex-col">
                    <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                      <span className="ml-1 mt-4 font-semibold">Skills Acquired</span>
                      <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                        {expandedApp.skills ? expandedApp.skills : "No response"}
                      </div>
                    </div>

                    <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                      <span className="ml-1 mt-8 font-semibold">Skills Qualifications</span>
                      <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                        {expandedApp.skillsQual ? expandedApp.skillsQual : "No response"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h2 className="font-bold text-xl lg:text-2xl text-indigo-500 lg:ml-10 ml-7 mt-8">Other Information</h2>
                <div className="space-y-4 text-white px-7 lg:mb-7 mb-3 pt-3 lg:ml-7">
                  <div className="flex flex-col">
                    <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mb-2">
                      <span className="ml-1 mt-4 font-semibold">Additional Information</span>
                      <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none">
                        {expandedApp.other ? expandedApp.other : "No response"}
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2">
                      <div className="text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-4 font-semibold">LinkedIn</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.linkedin ? (
                            <Link target="_blank" href={expandedApp.linkedin}>
                              {expandedApp.linkedin}
                            </Link>
                          ) : (
                            "No response"
                          )}
                        </div>
                      </div>

                      <div className="text-indigo-500 text-md lg:text-lg flex flex-col lg:mr-10">
                        <span className="ml-1 mt-4 font-semibold">Resume</span>
                        <div className="p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400">
                          {expandedApp.resume ? (
                            <Link target="_blank" href={expandedApp.resume}>
                              {expandedApp.resume}
                            </Link>
                          ) : (
                            "No response"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyApps;