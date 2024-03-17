"use client"

import React from 'react'
import Nav from "../../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Listbox } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import Link from 'next/link';
import Footer from '@/components/footer';
import jobs from '@/data/jobData';

const tabs = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Contact Information' },
  { id: 3, name: 'Previous Experiences' },
  { id: 4, name: 'Skills / Expertise' },
  { id: 5, name: 'Other' },
]

const Apply = () => {

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

  const [skills, setSkills] = useState('')
  const [skillsQual, setSkillsQual] = useState('')

  const [other, setOther] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [resume, setResume] = useState('')

  const [submittedApp, setSubmittedApp] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [finalSubmit, setFinalSubmit] = useState(false)

  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setBackToTop(true);
        } else {
          setBackToTop(false);
        }
      });
    }, [])

    const scrollUp = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

  const handleSubmit = (status) => {
    if (status === 'edit') {
      setSubmitted(true);
    }
    if (status === 'submit') {
      setFinalSubmit(true);
    }

    const submittedData = {
      personalInformation: {
        job,
        name,
        dob,
        address,
        city,
        state,
        zip,
      },
      contactInformation: {
        email,
        phone,
        title,
        pronoun,
      },
      previousExperiences: {
        workExperience: workExp,
        workExperienceQualification: workExpQual,
        undergrad: {
          institution: undergrad,
          degree: undergradDegree,
        },
        grad: {
          institution: grad,
          degree: gradDegree,
        },
      },
      skillsExpertise: {
        skills,
        skillsQualification: skillsQual,
      },
      other: {
        additionalInformation: other,
        linkedin,
        resume,
      },
    };

    console.log(JSON.stringify(submittedData, null, 2));

    setSubmittedApp(submittedData);
  };

  return (
    <div className=''>
      <Nav />
      {!submitted && <div className='bg-gradient-to-r from-black via-indigo-900/10 to-black'>
        <div className='bg-white/5 m-12 px-6 py-12 rounded-lg lg:block border-2 border-indigo-900/40'>

          <div className='block lg:flex lg:flex-row lg:space-x-5 text-gray-300'>
            <div className='lg:w-1/4 w-full flex flex-col lg:text-xl font-medium border-r-4 border-gray-900/50 mb-10 lg:mb-0'>

              {tabs.map((tab) => (
                <button
                  className={`${active === tab.id ? "text-indigo-200 bg-indigo-900" : "text-gray-300"} 
                p-4 hover:bg-gray-600/60 transition ease-linear duration-150 rounded-2xl justify-between flex flex-row lg:mx-5 lg:mr-8 group`}
                  onClick={() => setActive(tab.id)}
                >
                  <span>
                    {tab.name}
                  </span>
                  <span className='flex items-center text-[30px] hover:translate-x-3 group-hover:translate-x-1 transition ease-linear duration-100'>
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              ))}

            </div>

            {/* Personal Information */}

            <div className={`${active === 1 ? "block" : "hidden"} lg:w-4/5 w-full lg:pl-10`}>
              <span className='text-xl lg:text-3xl font-semibold text-blue-300'>
                Personal Information
              </span>
              <select
                className='bg-black py-2 px-3 rounded-md text-md lg:text-xl border-2 border-indigo-900 lg:mt-0 mt-10 ml-0 lg:ml-5'
                onChange={(e) => setJob(e.target.value)} 
                defaultValue="" 
              >
                <option value="" disabled>Select a job</option>
                {jobs.map((job, index) => (
                  <option key={index} value={job.title}>{job.title}</option>
                ))}
              </select>
              <div className='grid grid-cols-1 lg:grid-cols-2 text-white lg:mr-32 lg:p-7 pt-12'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1'>Full Name</span>
                  <input value={name} placeholder='John Doe' onChange={(e) => setName(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex mt-10 lg:mt-0 flex-col'>
                  <span className='ml-1'>Date of Birth</span>
                  <input value={dob} placeholder='MM/DD/YYYY' onChange={(e) => setDob(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Address</span>
                  <input value={address} placeholder='123 Example Ave' onChange={(e) => setAddress(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10'>
                  <span className='ml-1'>City</span>
                  <input value={city} placeholder='Los Angeles' onChange={(e) => setCity(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>State/Country</span>
                  <input value={state} placeholder='California, USA' onChange={(e) => setState(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10'>
                  <span className='ml-1'>Zip Code</span>
                  <input value={zip} placeholder='12345' onChange={(e) => setZip(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

              </div>
            </div>

            {/* Contact Information */}

            <div className={`${active === 2 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
              <span className='text-xl lg:text-3xl font-semibold text-blue-300'>
                Contact Information
              </span>
              <div className='grid grid-cols-1 lg:grid-cols-2 text-white lg:mr-32 lg:p-7 pt-12'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1'>Email</span>
                  <input value={email} placeholder='username@email.com' onChange={(e) => setEmail(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mt-0'>
                  <span className='ml-1'>Phone Number</span>
                  <input value={phone} placeholder='123-458-7890' onChange={(e) => setPhone(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Title (opt)</span>
                  <input value={title} placeholder='Mr., Mrs., etc.' onChange={(e) => setTitle(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10'>
                  <span className='ml-1'>Pronouns</span>
                  <input value={pronoun} placeholder='They/them' onChange={(e) => setPronoun(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

              </div>
            </div>

            {/* Academic / Work Experience */}

            <div className={`${active === 3 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
              <span className='text-xl lg:text-3xl font-semibold text-blue-300'>
                Previous Experiences
              </span>
              <div className=' grid text-white lg:mr-32 lg:p-7 pt-12'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1'>List all previous <strong>work</strong> experiences</span>
                  <textarea value={workExp} placeholder='Company names, years worked, brief role description, etc.' onChange={(e) => setWorkExp(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Why do these experiences qualify you for this position?</span>
                  <textarea value={workExpQual} placeholder='Short essay about how your experiences have shaped you...' onChange={(e) => setWorkExpQual(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='grid lg:grid-cols-2'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Undergrad Institution / Graduating Year</span>
                    <input value={undergrad} placeholder='Example University, YYYY' onChange={(e) => setUndergrad(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Degree(s) Earned</span>
                    <input value={undergradDegree} placeholder='Data Science' onChange={(e) => setUndergradDegree(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>

                <div className='grid lg:grid-cols-2'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Grad Institution / Graduating Year</span>
                    <input value={grad} placeholder='Example University, YYYY' onChange={(e) => setGrad(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                    <span className='ml-1'>Degree(s) Earned</span>
                    <input value={gradDegree} placeholder='Data Science' onChange={(e) => setGradDegree(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}

            <div className={`${active === 4 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
              <span className='text-xl lg:text-3xl font-semibold text-blue-300'>
                Skills & Expertise
              </span>
              <div className='grid text-white lg:mr-32 lg:p-7 pt-12'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1'>What do you consider to be your top <strong>five</strong> professional skills and why?</span>
                  <textarea value={skills} placeholder='List top five skills...' onChange={(e) => setSkills(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Why do these skills equip you to succeed at DataVoyagers?</span>
                  <textarea value={skillsQual} placeholder='Elaborate on your unique skillset and why DV specifically can use your skills' onChange={(e) => setSkillsQual(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
              </div>
            </div>

            {/* Other */}

            <div className={`${active === 5 ? "block" : "hidden"} lg:w-4/5 lg:pl-10`}>
              <span className='text-xl lg:text-3xl font-semibold text-blue-300'>
                Other
              </span>
              <div className='grid text-white lg:mr-32 lg:p-7 pt-12'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1'>Is there anything else you would like us to know about you?</span>
                  <textarea value={other} placeholder='Why you are the best fit, gaps in your résume, unusual details...' onChange={(e) => setOther(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
                <div className='grid lg:grid-cols-2 mt-10'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>Link to LinkedIn Profile</span>
                    <input value={linkedin} placeholder='linkedin.com/in/username' onChange={(e) => setLinkedin(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1'>Link to Résume</span>
                    <input value={resume} placeholder='www.example.com/resume' onChange={(e) => setResume(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>
                <span className='flex flex-row gap-4'>
                  <button className='flex my-auto items-center text-xl border-2 border-indigo-500 rounded-md px-4 py-2 hover:bg-indigo-500 transition ease-linear mt-10'>Save</button>
                  <button onClick={() => { handleSubmit("edit"); scrollUp(); }} className='flex my-auto items-center text-xl bg-indigo-500 rounded-md px-4 border-2 border-indigo-500 py-2 hover:brightness-75 transition ease-linear mt-10 group'>
                    Review
                    <span className="text-md lg:text-2xl group-hover:translate-x-1 transition duration-150 ease-linear">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>}

      {finalSubmit && 
        <div className='p-7 border-2 rounded-lg m-7  border-indigo-900/45'>
          <h1 className='text-xl text-indigo-400 font-semibold'>Thanks for submitting your application!</h1>
          <p className='inline text-md text-indigo-300 mt-2'>The DataVoyagers team is eager to read your application. Feel free to email our recruitment team with any updates to your application using the email <p className='inline underline'> files@careers.datavoyagers.com</p>. Excpect to receive an email from our hiring team within 7-14 business days with an interview. We will let you know if we are deciding not to move forward with your application over email. Here is to a new potential voyage 🥂🚀</p>
        </div>}

      {submitted && <div className='lg:bg-gradient-to-r from-black via-indigo-950/40 to-black'>
        <div className='bg-white/5 lg:m-10 lg:p-10 rounded-lg lg:block lg:border-2 lg:border-indigo-900/40'>
          <div className='text-white'>
            <h1 className='font-bold text-xl lg:text-2xl mb-12 ml-6 mt-4 inline'>Review Your Application: <h1 className='border-2 border-indigo-500 px-2 rounded-md border-dashed text-xl lg:text-2xl inline text-indigo-500'>{submittedApp.personalInformation.job}</h1></h1>

            <div className='lg:ml-2'>

              <h2 className='font-semibold text-xl lg:text-2xl text-blue-400 ml-7 mt-8'>
                Personal Information
              </h2>
              <div className='space-y-6 grid lg:grid-cols-2 text-white lg:mr-56 p-7 lg:ml-7'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1 mt-6'>Full Name</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.name || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col'>
                  <span className='ml-1'>Date of Birth</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.dob || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Address</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.address || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 mr-13'>
                  <span className='ml-1'>City</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.city || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>State/Country</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.state || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10'>
                  <span className='ml-1'>Zip Code</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.personalInformation.zip || 'No response'}
                  </div>
                </div>

              </div>
            </div>

            <div className='ml-2'>

              <h2 className='font-semibold text-xl lg:text-2xl text-blue-400 ml-7 mt-8'>
                Contact Information
              </h2>

              <div className='space-y-6 grid lg:grid-cols-2 text-white lg:mr-56 p-7 lg:ml-7'>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                  <span className='ml-1 mt-6'>Email</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.contactInformation.email !== '' ? submittedApp.contactInformation.email : 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col'>
                  <span className='ml-1'>Phone</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.contactInformation.phone || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Title</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.contactInformation.title || 'No response'}
                  </div>
                </div>

                <div className='text-gray-300 text-md lg:text-lg flex flex-col mt-10 lg:mr-10'>
                  <span className='ml-1'>Pronouns</span>
                  <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                    {submittedApp.contactInformation.pronoun || 'No response'}
                  </div>
                </div>

              </div>
            </div>

            <div className='ml-2'>

              <h2 className='font-semibold text-xl lg:text-2xl text-blue-400 ml-7 mt-8'>
                Previous Experience
              </h2>

              <div className='space-y-4 text-white lg:mr-56 p-7 lg:ml-7'>

                <div className='flex flex-col'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1 mt-4'>Work Experience</span>
                    <div placeholder='John Doe' onChange={(e) => setName(e.target.value)} className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.workExperience || 'No response'}
                    </div>
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg flex flex-col'>
                    <span className='ml-1 mt-8'>Work Experience Qualifications</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.workExperienceQualification || 'No response'}
                    </div>
                  </div>
                </div>

                <div className='grid lg:grid-cols-2 space-y-6'>
                  <div className='text-gray-300 text-md lg:text-lg mt-6 lg:mr-10'>
                    <span className='ml-1'>Undergraduate Education Information</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.undergrad.institution || 'No response'}
                    </div>
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg mt-4 lg:mr-10'>
                    <span className='ml-1'>Undergraduate Degree(s)</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.undergrad.degree || 'No response'}
                    </div>
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg lg:mr-10'>
                    <span className='ml-1'>Graduate Education Information</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.grad.institution || 'No response'}
                    </div>
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg mt-4 lg:mr-10'>
                    <span className='ml-1'>Graduate Degree(s)</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.previousExperiences.grad.institution || 'No response'}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='ml-2'>

              <h2 className='font-semibold text-xl lg:text-2xl text-blue-400 ml-7 mt-8'>
                Skills / Expertise
              </h2>

              <div className='space-y-4 text-white lg:mr-56 p-7 lg:ml-7'>

                <div className='flex flex-col'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                    <span className='ml-1 mt-4'>Skills Acquired</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.skillsExpertise.skills || 'No response'}
                    </div>
                  </div>

                  <div className='text-gray-300 text-md lg:text-lg flex flex-col'>
                    <span className='ml-1 mt-8'>Skills Qualifications</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.skillsExpertise.skillsQualification || 'No response'}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='ml-2'>

              <h2 className='font-semibold text-xl lg:text-2xl text-blue-400 ml-7 mt-8'>
                Other Information
              </h2>

              <div className='space-y-4 text-white lg:mr-56 p-7 lg:ml-7'>

                <div className='flex flex-col'>
                  <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10 mb-2'>
                    <span className='ml-1 mt-4'>Additional Information</span>
                    <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                      {submittedApp.other.additionalInformation || 'No response'}
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2'>
                    <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1 mt-4'>LinkedIn</span>
                      <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                        {submittedApp.other.linkedin ? <Link target='_blank' href={submittedApp.other.linkedin}>{submittedApp.other.linkedin}</Link> : 'No response'}
                      </div>
                    </div>

                    <div className='text-gray-300 text-md lg:text-lg flex flex-col lg:mr-10'>
                      <span className='ml-1 mt-4'>Resume</span>
                      <div className='p-4 text-md lg:text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100'>
                        {submittedApp.other.resume ? <Link target='_blank' href={submittedApp.other.resume}>{submittedApp.other.resume}</Link> : 'No response'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {!finalSubmit && <span className='flex flex-row gap-4 lg:pl-20 ml-7 lg:ml-0 mb-10'>
              <button className='flex my-auto items-center lg:text-xl border-2 border-indigo-500 rounded-md px-4 py-2 hover:bg-indigo-500 transition ease-linear mt-10' 
              onClick={() => setSubmitted(false)}>
                Edit Application
              </button>
              {backToTop && (
                <button onClick={() => { handleSubmit("submit"); scrollUp(); }} className='flex my-auto items-center lg:text-xl bg-indigo-500 rounded-md px-4 py-2 border-2 border-indigo-500 hover:brightness-75 transition ease-linear mt-10 group'>
                  Submit
                  <span className="text-md lg:text-2xl group-hover:translate-x-1 transition duration-150 ease-linear">
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              )}

            </span>}

          </div>
        </div>
      </div>}
      <Footer/>
    </div>
  )
}

export default Apply;