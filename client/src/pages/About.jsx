import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userpic from '../assets/userpic.jpeg';
import { useNavigate, Link, Navigate } from 'react-router-dom';

const About = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileRes = await axios.get('https://devhub-oot5.onrender.comr/user/myprofile', {
          withCredentials: true
        });
        setUserData(profileRes.data.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <div className='text-white h-screen bg-gray-900 flex flex-col md:flex-row justify-center items-start p-5'>
      <div className='flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg mb-5 md:mr-10'>
        <img src={userpic} alt="user" className='object-cover w-[120px] h-[120px] rounded-full' />
        <h1 className='text-2xl font-semibold mt-3'>{userData.fullname}</h1>
      </div>

      <div className='flex flex-col flex-grow gap-5'>
        <h1 className='text-4xl font-semibold mb-2'>Profile Information</h1>
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h1 className='text-xl font-semibold'><b>Email:</b> {userData.email}</h1>
          <h1 className='text-xl font-semibold'><b>Mobile:</b> {userData.mobile}</h1>
          <h1 className='text-xl font-semibold'><b>GitHub Link:</b> {userData.githubLink || 'Not provided'}</h1>
          <h1 className='text-xl font-semibold'><b>Skills:</b></h1>
          {userData.skills ? (
            <ul className='list-disc pl-4'>
              {userData.skills.split(',').map((skill, index) => (
                <li key={index} className='text-xl'>{skill.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className='text-xl'>No skills available</p>
          )}
        </div>

        <div className='flex gap-4'>
          <button onClick={() => navigate('/friends')} className='bg-blue-500 py-2 px-6 rounded text-xl text-white hover:bg-blue-600 transition duration-300'>
            Friends List
          </button>
          <button onClick={() => navigate('/create-project')} className='bg-blue-500 py-2 px-6 rounded text-xl text-white hover:bg-blue-600 transition duration-300'>
            Create Project
          </button>
          <button onClick={() => navigate('/my-projects')} className='bg-blue-500 py-2 px-6 rounded text-xl text-white hover:bg-blue-600 transition duration-300'>
            My Projects
          </button>
          <button onClick={() => navigate('/requests')} className='bg-blue-500 py-2 px-6 rounded text-xl text-white hover:bg-blue-600 transition duration-300'>
            Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
