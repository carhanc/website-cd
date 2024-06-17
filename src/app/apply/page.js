"use client"

import React, { useState, useEffect } from 'react';
import Nav from "../../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiError } from "react-icons/bi";
import Link from 'next/link';
import Footer from '@/components/footer';
import jobs from '@/data/jobData';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

import AuthLogic, {fetchUserData} from '@/firebase/authLogic';
import {auth, db } from '@/firebase/auth';
import { collection, setDoc, doc, getDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const tabs = [
  { id: 1, name: 'Personal Information', fields: ['job', 'name', 'dob', 'address', 'city', 'state', 'zip'] },
  { id: 2, name: 'Contact Information', fields: ['email', 'phone', 'title', 'pronoun'] },
  { id: 3, name: 'Higher Education', fields: ['undergrad', 'undergradDegree', 'undergradMajor', 'gradMajor', 'grad', 'gradDegree'] },
  { id: 4, name: 'Previous Experiences', fields: ['workExp', 'workExpQual'] },
  { id: 5, name: 'Skills / Expertise', fields: ['skills', 'skillsQual'] },
  { id: 6, name: 'Other', fields: ['other', 'linkedin', 'resume'] },
]

const Apply = () => {
  const searchParams = useSearchParams();
  let selectedJob = searchParams.get("selectedJob");
  // let form = searchParams.get("form") ? JSON.parse(decodeURIComponent(searchParams.get("form"))) : {};


  let form = JSON.parse(searchParams.get("form"));
  const router = useRouter()


  // States storing the user's input for each field and the status mode of the form (edit, review, submit)

  const [active, setActive] = useState(1)

  const [job, setJob] = useState('')
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState('')
  const [pronoun, setPronoun] = useState('')

  const [workExp, setWorkExp] = useState('')
  const [workExpQual, setWorkExpQual] = useState('')
  const [undergrad, setUndergrad] = useState('')
  const [undergradDegree, setUndergradDegree] = useState('')
  const [grad, setGrad] = useState('')
  const [gradDegree, setGradDegree] = useState('')
  const [undergradMajor, setUndergradMajor] = useState('')
  const [gradMajor, setGradMajor] = useState('')


  const [skills, setSkills] = useState('')
  const [skillsQual, setSkillsQual] = useState('')

  const [other, setOther] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [resume, setResume] = useState('')

  //For Submitting Applications to Firebase
  const [submittedApps, setSubmittedApps] = useState([])
  
  const submittedAppsCollectionRef = collection(db, 'submittedApplications'); 
  
  useEffect(() => {

    const getSubmittedApps = async () => {
      try {
        const data = await getDocs(submittedAppsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));

        setSubmittedApps(filteredData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }

    getSubmittedApps();
  }, [])

  // For Saving Applications to Firebase
  const [savedApps, setSavedApps] = useState([])
  
  const savedAppsCollectionRef = collection(db, 'savedApplications'); 
  
  useEffect(() => {

    const getSubmittedApps = async () => {
      try {
        const data = await getDocs(savedAppsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));

        setSavedApps(filteredData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }

    getSubmittedApps();
  }, [])
  //end of Firebase code


  // State to store the application status (edit, review, submit) and the final submission status (true/false
  const [submittedApp, setSubmittedApp] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [finalSubmit, setFinalSubmit] = useState(false)

  const [backToTop, setBackToTop] = useState(false);
  const [errors, setErrors] = useState({});
  const [tabErrors, setTabErrors] = useState({});


  const [userData, setUserData] = useState(null);

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

  const [formData, setFormData] = useState({
    id: form?.id || '',
    job: form?.job || selectedJob || "",
    name: form?.name || '',
    dob: form?.dob || '',
    address: form?.address || '',
    city: form?.city || '',
    state: form?.state || '',
    zip: form?.zip || '',
    email: form?.email || '',
    phone: form?.phone || '',
    title: form?.title || '',
    pronoun: form?.pronoun || '',
    workExp: form?.workExp || '',
    workExpQual: form?.workExpQual || '',
    undergrad: form?.undergrad || '',
    undergradDegree: form?.undergradDegree || '',
    undergradMajor: form?.undergradMajor || '',
    grad: form?.grad || '',
    gradDegree: form?.gradDegree || '',
    gradMajor: form?.gradMajor || '',
    skills: form?.skills || '',
    skillsQual: form?.skillsQual || '',
    other: form?.other || '',
    linkedin: form?.linkedin || '',
    resume: form?.resume || '',
  });
  console.log(formData);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'title' && key !== 'pronoun' && key !== "id" && key !== "grad" && key !== "gradDegree" && key !== "gradMajor") {
        newErrors[key] = 'No response';
      }
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{3}\d{3}\d{4}$/;
    const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (formData.dob && !dobPattern.test(formData.dob)) {
      newErrors.dob = 'Invalid date of birth format';
    }

    setErrors(newErrors);
    updateTabErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const updateTabErrors = (newErrors) => {
    const tabErrorsCount = {};
    tabs.forEach(tab => {
      const errorCount = tab.fields.reduce((count, field) => newErrors[field] ? count + 1 : count, 0);
      tabErrorsCount[tab.id] = errorCount;
    });
    setTabErrors(tabErrorsCount);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmitApp = async () => {
          
    try {

      const timestamp = new Date().toISOString();
      
      await addDoc(submittedAppsCollectionRef, {
        job: formData.job,
        name: formData.name,
        dob: formData.dob,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        email: formData.email,
        phone: formData.phone,
        title: formData.title,
        pronoun: formData.pronoun,
        workExp: formData.workExp,
        workExpQual: formData.workExpQual,
        undergrad: formData.undergrad,
        undergradDegree: formData.undergradDegree,
        undergradMajor: formData.undergradMajor,
        grad: formData.grad,
        gradDegree: formData.gradDegree,
        gradMajor: formData.gradMajor,
        skills: formData.skills,
        skillsQual: formData.skillsQual,
        other: formData.other,
        linkedin: formData.linkedin,
        resume: formData.resume,
        submittedAt: timestamp,
        uid: auth.currentUser.uid,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  const deleteSavedApp = async (id) => {
    try {
      const docRef = doc(db, 'savedApplications', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const onSavedApp = async () => {
    try {

      const timestamp = new Date().toISOString();

      // Check if the application already exists by its ID
      const existingApp = savedApps.find(app => app.id === formData.id);
  
      if (existingApp) {
        // If the application exists, update it using setDoc
        const docRef = doc(db, 'savedApplications', formData.id);
        await setDoc(docRef, {
          job: formData.job,
          name: formData.name,
          dob: formData.dob,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          email: formData.email,
          phone: formData.phone,
          title: formData.title,
          pronoun: formData.pronoun,
          workExp: formData.workExp,
          workExpQual: formData.workExpQual,
          undergrad: formData.undergrad,
          undergradDegree: formData.undergradDegree,
          undergradMajor: formData.undergradMajor,
          grad: formData.grad,
          gradDegree: formData.gradDegree,
          gradMajor: formData.gradMajor,
          skills: formData.skills,
          skillsQual: formData.skillsQual,
          other: formData.other,
          linkedin: formData.linkedin,
          resume: formData.resume,
          savedAt: timestamp,
          uid: auth.currentUser.uid,
        });
      } else {
        // If the application does not exist, add a new one
        const docRef = await addDoc(savedAppsCollectionRef, {
          job: formData.job,
          name: formData.name,
          dob: formData.dob,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          email: formData.email,
          phone: formData.phone,
          title: formData.title,
          pronoun: formData.pronoun,
          workExp: formData.workExp,
          workExpQual: formData.workExpQual,
          undergrad: formData.undergrad,
          undergradDegree: formData.undergradDegree,
          undergradMajor: formData.undergradMajor,
          grad: formData.grad,
          gradDegree: formData.gradDegree,
          gradMajor: formData.gradMajor,
          skills: formData.skills,
          skillsQual: formData.skillsQual,
          other: formData.other,
          linkedin: formData.linkedin,
          resume: formData.resume,
          savedAt: timestamp,
          uid: auth.currentUser.uid,
        });
        // Update the formData with the new document ID
        setFormData({ ...formData, id: docRef.id });
      }
  
      console.log('Application Saved Successfully:', formData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const handleSave = (status) => {
      if (status === 'save') {
      onSavedApp();
      router.push('/myapps');
    }};

const handleSubmit = async (status) => {
  if (validateFields()) {
    if (status === 'edit') {
      setSubmitted(true);
    }
    if (status === 'submit') {
      setFinalSubmit(true);

      // Submitting Data to Firebase
      await onSubmitApp();

      // If the application was previously saved, delete it
      if (formData.id) {
        await deleteSavedApp(formData.id);
      }
    }
    setSubmittedApp(formData);
  }
};

  return (
    <div className=''>
      <Nav />
      
      {!submitted && !finalSubmit && (
        <main className="lg:flex flex-col text-indigo-900 bg-gradient-to-r from-indigo-300 to-indigo-200 lg:mb-0 lg:px-32 lg:py-20 p-10">
          <div className="flex flex-col lg:text-left">
            <p className="font-bold lg:mx-0 lg:pb-4 pb-2 text-2xl lg:text-3xl inline">
              Become a Voyager
            </p>
            <p className="lg:mx-0 lg:pb-4 pb-2 text-xl lg:text-xl inline ">
              Join our team and start your journey with us. Explore the opportunities and apply now to become part of our dynamic workforce.
            </p>
          </div>
        </main>
      )}

      {!submitted && (
        <div className='bg-indigo-50'>
            <div className='block lg:flex lg:flex-row lg:space-x-5 text-gray-300 lg:px-20 p-10 py-14'>
              <div className='xl:w-1/4 lg:w-1/3 w-full flex flex-col lg:text-md font-medium bg-indigo-200 rounded-lg py-6 mb-10 lg:mb-0'>
                {tabs.map((tab) => (
                  <button
                    className={`${active === tab.id ? "text-indigo-100 bg-indigo-600/90" : errors[tab.id] ? "text-red-500" : "text-gray-500"} 
                     px-4 hover:bg-gray-400/60 hover:text-gray-500 transition ease-linear duration-150 rounded-lg justify-between flex mx-4 group py-4`}
                    onClick={() => setActive(tab.id)}
                    key={tab.id}
                  >
                    <span>{tab.name}</span>
                    {tabErrors[tab.id] > 0 && (
                      <span className='flex bg-red-100 text-red-700 border-yellow-600 border border-dashed rounded-full px-2 text-sm ml-auto'>
                        <BiError className='my-auto mr-1'/> {tabErrors[tab.id]}
                      </span>
                    )}
                    <span className='flex items-center text-3xl group-hover:translate-x-2 transition ease-linear duration-100'>
                    
                    </span>
                  </button>
                ))}
                <span className='flex flex-row gap-2 mt-auto mx-auto'>
                  <button onClick={() => { handleSubmit("edit"); scrollUp(); }} className='flex text-md bg-indigo-500 rounded-md pl-4 pr-3 border-2 border-indigo-500 py-2 hover:text-indigo-100 hover:brightness-[1.15] transition ease-linear duration-200 mt-10 group font-medium text-gray-100'>
                    Review
                    <span className="text-md lg:text-2xl group-hover:translate-x-1 transition duration-150 ease-linear hidden lg:block">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>

                  <button onClick={() => {handleSave("save");}} className='flex my-auto items-center text-md rounded-md px-4 border-2 border-indigo-500 py-2 text-indigo-500 hover:text-gray-100 hover:bg-indigo-500 transition ease-linear duration-200 mt-10 group font-medium'>
                    Save for Later
                  </button>
                </span>
              </div>

              {/* Personal Information */}
              <div className={`${active === 1 ? "block" : "hidden"} lg:w-4/5 w-full lg:pl-10`}>
                <div className='flex'>
                  <div className='lg:block flex flex-col'>
                    <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Personal Information</span>
                    <select
                      name="job"
                      className='bg-indigo-400/30 py-2 px-3 text-indigo-600 focus:ring-indigo-500 focus:outline-none rounded-lg lg:text-xl text-md font-medium border border-indigo-500/40 
                      lg:mt-0 mt-3 ml-0 lg:ml-5'
                      onChange={handleChange}
                      value={formData.job}
                    >
                      <option value="" disabled>Select a job</option>
                      {jobs.map((job, index) => (
                        <option key={index} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                  {errors.job && <span className='ml-2 flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-3 rounded-md text-sm'>
                    <BiError className='my-auto mr-1' />{errors.job}</span>}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:mr-32 lg:pt-12 pt-10'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>Full Name</span>
                    <input name="name" value={formData.name} placeholder='John Doe' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.name ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.name && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.name}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex mt-10 lg:mt-0 flex-col'>
                    <span className='ml-1'>Date of Birth</span>
                    <input name="dob" value={formData.dob} placeholder='MM/DD/YYYY' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.dob ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.dob && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.dob}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Address</span>
                    <input name="address" value={formData.address} placeholder='123 Example Ave' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.address ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.address && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.address}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10'>
                    <span className='ml-1'>City</span>
                    <input name="city" value={formData.city} placeholder='Los Angeles' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.city ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.city && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.city}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>State/Country</span>
                    <input name="state" value={formData.state} placeholder='California, USA' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.state ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.state && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.state}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10'>
                    <span className='ml-1'>Zip Code</span>
                    <input name="zip" value={formData.zip} placeholder='12345' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.zip ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.zip && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.zip}</span>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className={`${active === 2 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
                <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Contact Information</span>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:mr-32 lg:pt-8 pt-6 text-gray-300'>
                  
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>Email</span>
                    <input name="email" value={formData.email} placeholder='username@email.com' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.email ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.email && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.email}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10 lg:mt-0'>
                    <span className='ml-1'>Phone Number</span>
                    <input name="phone" value={formData.phone} placeholder='1234587890' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.phone ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.phone && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.phone}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Title (optional)</span>
                    <input name="title" value={formData.title} placeholder='Mr., Mrs., etc.' onChange={handleChange} className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none text-indigo-500' />
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10'>
                    <span className='ml-1'>Pronouns (optional)</span>
                    <input name="pronoun" value={formData.pronoun} placeholder='They/them' onChange={handleChange} className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none text-indigo-500' />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className={`${active === 3 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
                <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Higher Education</span>
                <div className='grid lg:mr-32 lg:pt-8 md:pt-12 pt-6 text-gray-300'>
                  
                  <div className='lg:grid lg:grid-cols-2'>

                    <div className='grid lg:grid-rows-3'>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                        <span className='ml-1'>Undergraduate Institution & Graduating Year</span>
                        <input name="undergrad" value={formData.undergrad} placeholder='Example University, YYYY' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.undergrad ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.undergrad && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.undergrad}</span>}
                      </div>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10 lg:mt-3'>
                        <span className='ml-1'>Undergraduate Major / Field of Study</span>
                        <input name="undergradMajor" value={formData.undergradMajor} placeholder='Post Doc' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.undergradMajor ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.undergradMajor && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.undergradMajor}</span>}
                      </div>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10 lg:mt-6'>
                        <span className='ml-1'>Undergraduate Degree(s) Earned</span>
                        <input name='undergradDegree' placeholder='Doctoral' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.undergradDegree ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.undergradDegree && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.undergradDegree}</span>}
                      </div>

                    </div>

                    <div className='grid lg:grid-rows-3'>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10 lg:mt-0'>
                        <span className='ml-1'>Graduate Institution & Graduating Year (Optional)</span>
                        <input name="grad" value={formData.grad} placeholder='Post Doc' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.grad ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.grad && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.grad}</span>}
                      </div>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-10 lg:mt-3'>
                        <span className='ml-1'>Graduate Major / Field of Study (Optional)</span>
                        <input name="gradMajor" value={formData.gradMajor} placeholder='Post Doc' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.gradMajor ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.gradMajor && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.gradMajor}</span>}
                      </div>

                      <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-1 mt-10 lg:mt-6'>
                        <span className='ml-1'>Graduate Degree(s) Earned (Optional)</span>
                        <input name="gradDegree" value={formData.gradDegree} placeholder='Post Doc' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.gradDegree ? 'text-red-500' : 'text-indigo-500'}`} />
                        {errors.gradDegree && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.gradDegree}</span>}
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Previous Experiences */}
              <div className={`${active === 4 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
                <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Previous Experiences</span>
                <div className='grid lg:mr-32 lg:pt-8 md:pt-12 pt-6 text-gray-300'>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>List all your previous <strong>work</strong> experiences</span>
                    <textarea name="workExp" value={formData.workExp} placeholder='Company names, years worked, brief role description, etc.' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.workExp ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.workExp && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.workExp}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Why do these experiences qualify you for this position?</span>
                    <textarea name="workExpQual" value={formData.workExpQual} placeholder='Short essay about how your experiences have shaped you...' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.workExpQual ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.workExpQual && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.workExpQual}</span>}
                  </div>
                  
                </div>
              </div>

              {/* Skills & Expertise */}
              <div className={`${active === 5 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
                <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Skills & Expertise</span>
                <div className='grid lg:mr-32 lg:pt-8 md:pt-12 pt-6 text-gray-300'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>What do you consider to be your top <strong>five</strong> professional skills and why?</span>
                    <textarea name="skills" value={formData.skills} placeholder='List top five skills...' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.skills ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.skills && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.skills}</span>}
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Why do these skills equip you to succeed at DataVoyagers?</span>
                    <textarea name="skillsQual" value={formData.skillsQual} placeholder='Elaborate on your unique skillset... How does it help DataVoyagers?' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.skillsQual ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.skillsQual && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.skillsQual}</span>}
                  </div>
                </div>
              </div>

              {/* Other */}
              <div className={`${active === 6 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
                <span className='text-xl lg:text-3xl font-bold text-indigo-500/95'>Other Information</span>
                <div className='grid lg:mr-32 lg:pt-8 md:pt-12 pt-6 text-gray-300'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>Is there anything else you would like us to know about you?</span>
                    <textarea name="other" value={formData.other} placeholder='Why you are the best fit, gaps in your résume, unusual details...' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.other ? 'text-red-500' : 'text-indigo-500'}`} />
                    {errors.other && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.other}</span>}
                  </div>

                  <div className='grid lg:grid-cols-2 mt-10 lg:space-y-0 md:space-y-0 space-y-10'>
                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1'>Link to LinkedIn Profile</span>
                      <input name="linkedin" value={formData.linkedin} placeholder='linkedin.com/in/username' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.linkedin ? 'text-red-500' : 'text-indigo-500'}`} />
                      {errors.linkedin && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.linkedin}</span>}
                    </div>
                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1'>Link to Résume</span>
                      <input name="resume" value={formData.resume} placeholder='www.example.com/resume' onChange={handleChange} className={`p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 placeholder:text-indigo-400 mt-3 outline-none ${errors.resume ? 'text-red-500' : 'text-indigo-500'}`} />
                      {errors.resume && <span className='flex text-red-500 bg-red-100 w-fit px-2 border-dashed border border-red-500 my-2 rounded-md text-sm'><BiError className='my-auto mr-1' />{errors.resume}</span>}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
        </div>
      )}

      {finalSubmit &&
        <div className='p-7 rounded-lg m-7 lg:mx-10 mx-5 border-2 border-indigo-400/90 bg-indigo-200/5 space-y-10'>
          <div className='lg:flex'>
            <h1 className='lg:text-2xl text-xl text-indigo-500 font-bold lg:mb-1 mb-3 mr-3'>Thanks for submitting your application!</h1>
            <Link href='/myapps' className='bg-indigo-500 text-white py-2 px-3 rounded-md'>My Applications</Link>
          </div>
          <p className='inline text-lg text-indigo-500/85 font-mediums'>The DataVoyagers team is eager to read your application. Feel free to email our recruitment team with any updates to your application using the email <p className='inline underline'> files@careers.datavoyagers.com</p>. Excpect to receive an email from our hiring team within 7-14 business days with an interview and further instructions. We will let you know if we are deciding not to move forward with your application over email. Here is to a new potential voyage! 
            <span className='ml-1 text-xl'>🥂🚀</span></p>
        </div>
      }

      {submitted && <div className='bg-white'>
        <div className='bg-indigo-200/25 m-5 lg:m-10 lg:p-10 rounded-lg lg:block border-2 border-indigo-400/90'>
          <div className='text-white'>
            <h1 className='lg:flex-none flex flex-col items-center font-extrabold text-xl lg:text-2xl mb-12 text-indigo-700 lg:text-left md:text-left text-center lg:pt-0 pt-7 lg:flex lg:flex-row md:flex-row md:ml-7'>Review Your Application: 
              <h1 className='border-2 border-indigo-700/90 px-2 rounded-md border-dashed text-xl lg:text-2xl text-indigo-700/90 text-center lg:ml-2 w-fit'>{submittedApp.job}</h1>
            </h1>
            <div className='lg:ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 lg:mt-6'>Personal Information</h2>
              <div className='space-y-6 grid lg:grid-cols-2 text-white lg:mr-56 px-7 pb-7 lg:ml-7'>
                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1 mt-6 font-semibold'>Full Name</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.name || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Date of Birth</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.dob || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Address</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.address || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>City</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.city || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>State/Country</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.state || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Zip Code</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none'>
                    {submittedApp.zip || 'No response'}
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 mt-8'>Contact Information</h2>
              <div className='space-y-6 grid lg:grid-cols-2 text-white lg:mr-56 px-7 pb-7 lg:ml-7'>
                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1 mt-6 font-semibold'>Email</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.email || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Phone</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.phone || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Title</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.title || 'No response'}
                  </div>
                </div>

                <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1 font-semibold'>Pronouns</span>
                  <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                    {submittedApp.pronoun || 'No response'}
                  </div>
                </div>
              </div>
            </div>

          

            {/* Education */}
            <div className='ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 mt-8'>Higher Education</h2>
              <div className='space-y-4 text-white lg:mr-56 px-7 pb-7 pt-3 lg:ml-7'>
                <div className='grid lg:grid-cols-2'>
                  <div className='grid grid-rows-3'>
                    
                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1 mt-4 font-semibold'>Undergraduate Institution & Graduating Year</span>
                      <div placeholder='Example University, YYYY' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.undergrad || 'No response'}
                      </div>
                    </div>

                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-6 lg:mt-5'>
                      <span className='ml-1 font-semibold'>Undergraduate Major / Field of Study</span>
                      <div placeholder='BioEngineering' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.undergradMajor || 'No response'}
                      </div>
                    </div>

                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-6 lg:mt-6'>
                      <span className='ml-1 font-semibold'>Undergraduate Degree(s) Earned</span>
                      <div placeholder='Doctoral' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.undergradDegree || 'No response'}
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-rows-3'>
                    
                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 lg:mt-0'>
                      <span className='ml-1 mt-4 font-semibold'>Graduate Institution & Graduating Year (Optional)</span>
                      <div placeholder='Post Doc' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.grad || 'No response'}
                      </div>
                    </div>

                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-6 lg:mt-5'>
                      <span className='ml-1 font-semibold'>Graduate Major / Field of Study (Optional)</span>
                      <div placeholder='Post Doc' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.gradMajor || 'No response'}
                      </div>
                    </div>

                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mt-8 lg:mt-6'>
                      <span className='ml-1 font-semibold'>Graduate Degree(s) Earned (Optional)</span>
                      <div placeholder='Post Doc' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.gradDegree || 'No response'}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Previous Experiences */}
            <div className='ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 mt-8'>Previous Experiences</h2>
              <div className='space-y-4 text-white lg:mr-56 px-7 pb-7 pt-3 lg:ml-7'>
                <div className='flex flex-col'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1 mt-4 font-semibold'>Work Experience</span>
                    <div placeholder='Company names, years worked, brief role description, etc.' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                      {submittedApp.workExp || 'No response'}
                    </div>
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 lg:mt-3'>
                    <span className='ml-1 mt-8 font-semibold'>Work Experience Qualifications</span>
                    <div placeholder='Short essay about how your experiences have shaped you...' className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                      {submittedApp.workExpQual || 'No response'}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className='ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 mt-8'>Skills / Expertise</h2>
              <div className='space-y-4 text-white lg:mr-56 px-7 pb-7 pt-3 lg:ml-7'>
                <div className='flex flex-col'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1 mt-4 font-semibold'>Skills Acquired</span>
                    <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                      {submittedApp.skills || 'No response'}
                    </div>
                  </div>

                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1 mt-8 font-semibold'>Skills Qualifications</span>
                    <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                      {submittedApp.skillsQual || 'No response'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-2'>
              <h2 className='font-bold text-xl lg:text-2xl text-indigo-500 ml-7 mt-8'>Other Information</h2>
              <div className='space-y-4 text-white lg:mr-56 px-7 lg:mb-7 mb-3 pt-3 lg:ml-7'>
                <div className='flex flex-col'>
                  <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10 mb-2'>
                    <span className='ml-1 mt-4 font-semibold'>Additional Information</span>
                    <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none'>
                      {submittedApp.other || 'No response'}
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2'>
                    <div className='text-indigo-500 font-medium text-sm lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1 mt-4 font-semibold'>LinkedIn</span>
                      <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.linkedin ? <Link target='_blank' href={submittedApp.linkedin}>{submittedApp.linkedin}</Link> : 'No response'}
                      </div>
                    </div>

                    <div className='text-indigo-500 text-md lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1 mt-4 font-semibold'>Resume</span>
                      <div className='p-4 text-sm lg:text-md rounded-lg bg-indigo-400/25 text-indigo-500/80 mt-3 outline-none text-indigo-400'>
                        {submittedApp.resume ? <Link target='_blank' href={submittedApp.resume}>{submittedApp.resume}</Link> : 'No response'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!finalSubmit && (
              <span className='flex lg:flex-row md:flex-row flex-col gap-4 lg:pl-16 ml-10 lg:ml-0 mb-10 '>
                {backToTop && (
                  <button className='flex my-auto items-center lg:text-xl text-lg border-2 border-indigo-500 rounded-md px-4 py-2 hover:bg-indigo-500 transition ease-linear mt-10 text-indigo-500 font-medium hover:text-gray-100 lg:w-auto md:w-auto w-fit'
                    onClick={() => { setSubmitted(false); scrollUp(); }}>
                    Edit Application
                  </button>
                )}

                {backToTop && (
                  <button onClick={() => { handleSubmit("submit"); scrollUp(); }} 
                  className='flex my-auto items-center lg:text-xl text-lg bg-indigo-500 rounded-md px-4 border-2 border-indigo-500 py-2 hover:text-gray-100 hover:brightness-[1.15] transition ease-linear duration-200 lg:mt-10 md:mt-10 mt-4 group font-medium text-gray-100 lg:w-auto md:w-auto w-fit'>
                    Submit
                    <span className="text-md text-2xl group-hover:translate-x-1 transition duration-150 ease-linear">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>}
      <Footer />
    </div>
  );
}

export default Apply;