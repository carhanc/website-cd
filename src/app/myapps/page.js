"use client"

import React, { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import { auth } from '@/firebase/auth';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/auth";

const MyApps = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, "submittedApplications"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setApplications(apps);
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
        {applications.length > 0 ? (
          <div>
            {applications.map((app) => (
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
                <p><strong>Skills:</strong> {app.skills}</p>

              </div>
            ))}
          </div>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyApps;