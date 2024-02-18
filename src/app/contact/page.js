"use client"

import React from 'react'
import Nav from "../../components/nav";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Listbox } from '@headlessui/react'
import { useState } from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const tabs = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Contact Information' },
  { id: 3, name: 'Previous Experiences' },
  { id: 4, name: 'Skills / Expertise' },
  { id: 5, name: 'Other' },
]

const Contact = () => {

  const [active, setActive] = useState(1)

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

  const handleSubmit = () => {
    // Compile all state values into a single object
    const submittedData = {
      personalInformation: {
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
      <div className='bg-gradient-to-r from-black via-indigo-900/45 to-black h-dvh'>
        <div className='text-gray-300 font-semibold text-2xl mx-16 pt-12'>
          New Job Application
        </div>

        <div className='bg-white/5 m-12 px-6 py-12 rounded-lg lg:block hidden border-2 border-indigo-900/40'>
          
          <div className='flex flex-row space-x-5 text-gray-300'>
            <div className='lg:w-1/4 w-1/4 flex flex-col lg:text-xl font-medium border-r-4 border-gray-900/50'>

              {tabs.map((tab) => (
                <button 
                className={`${active === tab.id ? "text-indigo-200 bg-indigo-900" : "text-gray-300"} 
                p-4 hover:bg-gray-600/60 transition ease-linear duration-150 rounded-2xl justify-between flex flex-row mx-5 mr-8 group`}
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

            <div className={`${active === 1 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
              <span className='text-3xl font-semibold text-blue-300'>
                Personal Information
              </span>
              <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

                <div className='text-gray-300 text-lg flex flex-col mr-10'>
                  <span className='ml-1'>Full Name</span>
                  <input placeholder='John Doe' onChange={(e) => setName(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col'>
                  <span className='ml-1'>Date of Birth</span>
                  <input placeholder='MM/DD/YYYY' onChange={(e) => setDob(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>Address</span>
                  <input placeholder='123 Example Ave' onChange={(e) => setAddress(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
                
                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>City</span>
                  <input placeholder='Los Angeles' onChange={(e) => setCity(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>State/Country</span>
                  <input placeholder='California, USA' onChange={(e) => setState(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10'>
                  <span className='ml-1'>Zip Code</span>
                  <input placeholder='12345' onChange={(e) => setZip(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

              </div>
            </div>
            
            {/* Contact Information */}

            <div className={`${active === 2 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
              <span className='text-3xl font-semibold text-blue-300'>
                Contact Information
              </span>
              <div className='grid grid-cols-2 text-white mr-56 p-7 pt-12'>

                <div className='text-gray-300 text-lg flex flex-col mr-10'>
                  <span className='ml-1'>Email</span>
                  <input placeholder='username@email.com' onChange={(e) => setEmail(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col'>
                  <span className='ml-1'>Phone Number</span>
                  <input placeholder='123-458-7890' onChange={(e) => setPhone(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>Title (opt)</span>
                  <input placeholder='Mr., Mrs., etc.' onChange={(e) => setTitle(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
                
                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>Pronoun</span>
                  <input placeholder='They/them' onChange={(e) => setPronoun(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

              </div>
            </div>
            
            {/* Academic / Work Experience */}

            <div className={`${active === 3 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
              <span className='text-3xl font-semibold text-blue-300'>
                Previous Experiences
              </span>
              <div className=' text-white mr-56 p-7 pt-12'>

                <div className='text-gray-300 text-lg flex flex-col mr-10'>
                  <span className='ml-1'>List all previous <strong>work</strong> experiences</span>
                  <textarea placeholder='Company names, years worked, brief role description, etc.' onChange={(e) => setWorkExp(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>Why do these experiences qualify you for this position?</span>
                  <textarea placeholder='Short essay about how your experiences have shaped you...' onChange={(e) => setWorkExpQual(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
                
                <div className='grid grid-cols-2'>
                  <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                    <span className='ml-1'>Undergrad Institution / Graduating Year</span>
                    <input placeholder='Example University, YYYY' onChange={(e) => setUndergrad(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>

                  <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                    <span className='ml-1'>Degree(s) Earned</span>
                    <input placeholder='Data Science' onChange={(e) => setUndergradDegree(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>

                <div className='grid grid-cols-2'>
                  <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                    <span className='ml-1'>Grad Institution / Graduating Year</span>
                    <input placeholder='Example University, YYYY' onChange={(e) => setGrad(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>

                  <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                    <span className='ml-1'>Degree(s) Earned</span>
                    <input placeholder='Data Science'onChange={(e) => setGradDegree(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills & Expertise */}

            <div className={`${active === 4 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
              <span className='text-3xl font-semibold text-blue-300'>
                Skills & Expertise
              </span>
              <div className='grid text-white mr-56 p-7 pt-12'>

                <div className='text-gray-300 text-lg flex flex-col mr-10'>
                  <span className='ml-1'>What do you consider to be your top <strong>five</strong> professional skills?</span>
                  <textarea placeholder='List top five skills...' onChange={(e) => setSkills(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>

                <div className='text-gray-300 text-lg flex flex-col mt-10 mr-10'>
                  <span className='ml-1'>Why do these skills equip you to succeed at DataVoyagers?</span>
                  <textarea placeholder='Elaborate on your unique skillset and why DV specifically can use your skills' onChange={(e) => setSkillsQual(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
              </div>
            </div>

            {/* Other */}

            <div className={`${active === 5 ? "block" : "hidden"} lg:w-4/5 w-3/4 pl-10`}>
              <span className='text-3xl font-semibold text-blue-300'>
                Other
              </span>
              <div className=' text-white mr-56 p-7 pt-12'>

                <div className='text-gray-300 text-lg flex flex-col mr-10'>
                  <span className='ml-1'>Is there anything else you would like us to know about you?</span>
                  <textarea placeholder='Why you are the best fit, gaps in your résume, unusual details...' onChange={(e) => setOther(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                </div>
                <div className='grid lg:grid-cols-2 mt-10'>
                  <div className='text-gray-300 text-lg flex flex-col mr-10'>
                    <span className='ml-1'>Link to LinkedIn Profile</span>
                    <input placeholder='linkedin.com/in/username' onChange={(e) => setLinkedin(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                  <div className='text-gray-300 text-lg flex flex-col mr-10'>
                    <span className='ml-1'>Link to Résume</span>
                    <input placeholder='www.example.com/resume' onChange={(e) => setResume(e.target.value)} className='p-4 text-lg rounded-xl bg-indigo-900/20 mt-3 outline-none text-gray-100' />
                  </div>
                </div>
                <span className='flex flex-row gap-4'>
                  <button className='flex my-auto items-center text-xl border-2 border-indigo-500 rounded-md px-4 py-2 hover:bg-indigo-500 transition ease-linear mt-10'>Save</button>
                  <button onClick={handleSubmit} className='flex my-auto items-center text-xl bg-indigo-500 rounded-md px-4 border-2 border-indigo-500 py-2 hover:brightness-75 transition ease-linear mt-10'>Submit <MdKeyboardArrowRight /></button>
                </span>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Contact