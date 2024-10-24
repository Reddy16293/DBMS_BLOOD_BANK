import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null); // State to store current user ID
  const [currentUserRole, setCurrentUserRole] = useState(null); // State to store current user role

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Fetch the current user's profile to get their ID and role
      axios.get('http://localhost:5001/user/myprofile', {
        headers: {
          'x-token': token, // Pass JWT token in headers
        }
      })
      .then(res => {
        setCurrentUserId(res.data.data._id); // Assuming the profile response has an '_id' field
        setCurrentUserRole(res.data.data.role); // Assuming the profile response has a 'role' field
      })
      .catch(err => {
        console.error("Error fetching current user profile:", err);
      });
    }

    // Fetch all user profiles
    axios.get('http://localhost:5001/user/allprofiles', {
      headers: {
        'x-token': token, // Pass JWT token in headers
      }
    })
    .then(res => {
      setUsersData(res.data.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching profiles:", err);
      setLoading(false);
    });
  }, []); // Empty dependency array means this runs once when the component mounts

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  // Filter profiles based on the current user's role
  let filteredProfiles;
  if (currentUserRole === 'admin') {
    // Admin can see all users (donors and patients)
    filteredProfiles = usersData.filter(profile => String(profile._id) !== String(currentUserId));
  } else if (currentUserRole === 'donor') {
    // Donor can see only patients
    filteredProfiles = usersData.filter(profile => profile.role === 'patient' && String(profile._id) !== String(currentUserId));
  } else if (currentUserRole === 'patient') {
    // Patient can see only donors
    filteredProfiles = usersData.filter(profile => profile.role === 'donor' && String(profile._id) !== String(currentUserId));
  } else {
    // If role is not recognized, set to an empty array
    filteredProfiles = [];
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-white">
      <div className="text-4xl my-8">Welcome to Developer Hub</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 overflow-hidden">
        {filteredProfiles.length > 0 ? 
          filteredProfiles.map(profile => <Card key={profile._id} profile={profile} />) 
          : <div>No profiles found.</div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
