import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skills: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/myprofile', {
          headers: {
            'x-token': localStorage.getItem('token'),
          },
        });
        setFormData({
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          mobile: response.data.data.mobile,
          skills: response.data.data.skills || ''
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put('http://localhost:5000/api/updateprofile', formData, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
      navigate('/myprofile'); // Redirect back to profile page
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white h-screen bg-gray-900 flex flex-col gap-y-10 justify-center items-center'>
      <div className='text-white text-4xl'>
        <h1>Edit Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-gray-800 p-6 rounded-lg'>
        <label>
          Full Name:
          <input
            type='text'
            name='fullname'
            value={formData.fullname}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 rounded'
          />
        </label>
        
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 rounded'
          />
        </label>
        
        <label>
          Mobile:
          <input
            type='text'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 rounded'
          />
        </label>

        <label>
          Skills:
          <input
            type='text'
            name='skills'
            value={formData.skills}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 rounded'
          />
        </label>
        
        <button type='submit' className='bg-blue-500 py-2 px-6 rounded mt-4 text-xl text-white hover:bg-blue-600 transition duration-300 ease-in-out'>
          Save Changes
        </button>
      </form>
    </div>
  );
};