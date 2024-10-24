import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import userpic from '../assets/userpic.jpeg';
import { useNavigate, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loadingBarRef = useRef(null); // Reference to control the loading bar

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (loadingBarRef.current) {
          loadingBarRef.current.continuousStart(); // Start the loading bar if it's available
        }

        const token = localStorage.getItem('token');
        const profileRes = await axios.get('http://localhost:5001/user/myprofile', {
          headers: {
            'x-token': token
          }
        });

        setUserData(profileRes.data.data);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete(); // Complete the loading bar if it's available
        }
      } catch (error) {
        if (loadingBarRef.current) {
          loadingBarRef.current.complete(); // Complete the loading bar in case of error
        }

        if (error.response) {
          console.log('Response Error:', error.response.data);
          console.log('Status:', error.response.status);
        } else if (error.request) {
          console.log('Request Error:', error.request);
        } else {
          console.log('Error:', error.message);
        }

        setError('Failed to load profile data.');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProfileData();
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <div>Loading...</div>; // You can keep this basic loading text or customize it
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <div className='text-white h-screen bg-gray-900 flex flex-col md:flex-row justify-center items-start p-5 overflow-y-auto'>
      {/* Loading bar component */}
      <LoadingBar color='#f11946' ref={loadingBarRef} shadow={true} />

      <div className='flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg mb-5 md:mr-10 md:w-1/3'>
        <img src={userpic} alt="User Profile" className='object-cover w-[120px] h-[120px] rounded-full border-4 border-blue-500' />
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

        <div className='flex flex-wrap gap-4'>
          <button onClick={() => navigate('/friends')} className='bg-blue-500 py-2 px-4 rounded text-xl text-white hover:bg-blue-600 transition duration-300 w-full md:w-auto'>
            Friends List
          </button>
          <button onClick={() => navigate('/create-project')} className='bg-blue-500 py-2 px-4 rounded text-xl text-white hover:bg-blue-600 transition duration-300 w-full md:w-auto'>
            Create Project
          </button>
          <button onClick={() => navigate('/my-projects')} className='bg-blue-500 py-2 px-4 rounded text-xl text-white hover:bg-blue-600 transition duration-300 w-full md:w-auto'>
            My Projects
          </button>
          <button onClick={() => navigate('/requests')} className='bg-blue-500 py-2 px-4 rounded text-xl text-white hover:bg-blue-600 transition duration-300 w-full md:w-auto'>
            Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
