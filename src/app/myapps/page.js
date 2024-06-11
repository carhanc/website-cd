"use client"

import React, { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import { auth } from '@/firebase/auth';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/auth";
import Link from 'next/link';

const MyApps = () => {
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [savedApplications, setSavedApplications] = useState([]);

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

  return (
    <div>
      <Nav />
      <div className="m-10">
        <h1 className="text-2xl font-bold mb-5">My Applications</h1>
        
        <h2 className="text-xl font-semibold mb-4">Submitted Applications</h2>
        {submittedApplications.length > 0 ? (
          <div>
            {submittedApplications.map((app) => (
              <div key={app.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold">{app.job}</h2>
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Date of Birth:</strong> {app.dob}</p>
                <p><strong>Address:</strong> {app.address}</p>
                <p><strong>City:</strong> {app.city}</p>
                <p><strong>State / Country:</strong> {app.state}</p>
                <p><strong>Zip Code:</strong> {app.zip}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Title:</strong> {app.title}</p>
                <p><strong>Pronouns:</strong> {app.pronoun}</p>
                <p><strong>Work Experience:</strong> {app.workExp}</p>
                <p><strong>Work Experience Qualifications:</strong> {app.workExpQual}</p>
                <p><strong>Undergraduate Information:</strong> {app.undergrad}</p>
                <p><strong>Undergraduate Degree(s):</strong> {app.undergradDegree}</p>
                <p><strong>Graduate Information:</strong> {app.grad}</p>
                <p><strong>Graduate Degree(s):</strong> {app.gradDegree}</p>
                <p><strong>Skills:</strong> {app.skills}</p>
                <p><strong>Qualifications from Skills:</strong> {app.skillsQual}</p>
                <p><strong>Any Additional Information:</strong> {app.other}</p>
                <p><strong>LinkedIn:</strong> {app.linkedin}</p>
                <p><strong>Resume:</strong> {app.resume}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No submitted applications found.</p>
        )}

        <h2 className="text-xl font-semibold mb-4 mt-8">Saved Applications</h2>
        {savedApplications.length > 0 ? (
          <div>
            {savedApplications.map((app) => (
              <div key={app.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold">{app.job}</h2>
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Date of Birth:</strong> {app.dob}</p>
                <p><strong>Address:</strong> {app.address}</p>
                <p><strong>City:</strong> {app.city}</p>
                <p><strong>State / Country:</strong> {app.state}</p>
                <p><strong>Zip Code:</strong> {app.zip}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Title:</strong> {app.title}</p>
                <p><strong>Pronouns:</strong> {app.pronoun}</p>
                <p><strong>Work Experience:</strong> {app.workExp}</p>
                <p><strong>Work Experience Qualifications:</strong> {app.workExpQual}</p>
                <p><strong>Undergraduate Information:</strong> {app.undergrad}</p>
                <p><strong>Undergraduate Degree(s):</strong> {app.undergradDegree}</p>
                <p><strong>Graduate Information:</strong> {app.grad}</p>
                <p><strong>Graduate Degree(s):</strong> {app.gradDegree}</p>
                <p><strong>Skills:</strong> {app.skills}</p>
                <p><strong>Qualifications from Skills:</strong> {app.skillsQual}</p>
                <p><strong>Any Additional Information:</strong> {app.other}</p>
                <p><strong>LinkedIn:</strong> {app.linkedin}</p>
                <p><strong>Resume:</strong> {app.resume}</p>
                <Link 
                  href={`/apply?form=${JSON.stringify(app)}`} 
                  className='px-2 py-1 border rounded-md border-black hover:text-white hover:bg-purple-500 transition ease-linear duration-300'>
                  Edit Application
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyApps;