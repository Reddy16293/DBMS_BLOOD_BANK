import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userpic from '../assets/userpic.jpeg'; // Path to user image
import axios from 'axios';

const ViewProfile = () => {
  const location = useLocation();  // Get the passed state
  const profile = location.state?.profile || {};  // Extract the profile data from state
  const [friendStatus, setFriendStatus] = useState(''); // Track friendship status
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile || !profile._id) {
      console.error('No profile data found');
      return;
    }

    // Fetch friend status using profile._id
    axios.get(`http://localhost:5001/friend/status/${profile._id}`, {
      headers: {
        'x-token': localStorage.getItem('token') // Retrieve token from localStorage
      }
    })
    .then(res => {
      setFriendStatus(res.data.status);  // 'friends', 'sent', or 'none'
    })
    .catch(err => {
      console.error('Error fetching friend status:', err);
    });
  }, [profile]);

  if (!profile) {
    return <div>Loading profile...</div>; // Show loading state if profile is not available yet
  }

  function handleBack(event) {
    event.preventDefault();
    navigate(-1); // Navigate back to the previous page
  }

  function handleAddFriend(event) {
    event.preventDefault();
  
    // Check current status before sending a request
    if (friendStatus === 'sent') {
      console.log('Friend request already sent');
      return;  // Prevent sending a request if already sent
    }
  
    console.log('Sending friend request to ID:', profile._id);
  
    // Optimistically update the friend status
    setFriendStatus('sent'); 
  
    axios.post(`http://localhost:5001/friend/send-request`, { friendId: profile._id }, {
      headers: {
        'x-token': localStorage.getItem('token') // Send token with the request
      }
    })
    .then(res => {
      // Optionally, handle success if needed
      console.log('Friend request sent successfully');
    })
    .catch(err => {
      // If the request failed, revert the status
      console.error('Error sending friend request:', err.response?.data || err.message);
      if (err.response?.data?.message === 'Friend request already sent') {
        // Optionally, you can display a notification to the user
        console.log('Friend request was already sent.'); // This could be a toast notification
      } else {
        setFriendStatus(''); // Or handle other errors as needed
      }
    });
  }

  return (
    <div className="text-white h-screen bg-gray-900 flex w-1/2 m-auto flex-col gap-y-10 justify-center items-center">
      <button onClick={handleBack} className='text-black px-4 py-1 bg-blue-100'>
        <i className="fas fa-arrow-left"></i> Back to Profiles
      </button>
      <div className="text-4xl text-center">
        <h1>{profile.fullname}'s Profile</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div>
          <img
            src={userpic}
            alt="user"
            className="object-cover w-[120px] h-[120px] rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-0.75">
          <div className='text-center items-center'>
            <h1><b>Full Name:</b> {profile.fullname}</h1>
            <h1><b>Email:</b> {profile.email}</h1>
            <h1><b>Mobile:</b> {profile.mobile}</h1>
            <h1><b>Country:</b> India</h1> {/* You might want to fetch this dynamically if applicable */}
          </div>
          <h4 className="font-semibold mb-1 mt-4 text-2xl text-blue-300">Skills</h4>
          <ul className="list-disc pl-4 mt-2">
            {profile.skills.split(',').map((skill, index) => (
              <li key={index} className="text-lg text-pink-400">{skill}</li>
            ))}
          </ul>
        </div>
        <div className='flex justify-between gap-x-3'>
          {friendStatus === 'friends' ? (
            <button className='bg-green-600 px-2 py-1 rounded-lg' disabled>
              Friends
            </button>
          ) : friendStatus === 'sent' ? (
            <button className='bg-yellow-500 px-2 py-1 rounded-lg' disabled>
              Sent Request
            </button>
          ) : (
            <button onClick={handleAddFriend} className='bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-200 hover:text-black'>
              Add Friend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
