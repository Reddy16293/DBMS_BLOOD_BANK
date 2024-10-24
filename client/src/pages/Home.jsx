import React from 'react';
import { Link } from 'react-router-dom';
import bgpic from '../assets/bgpic.jpg'; // Ensure you've replaced the background image

const Home = ({ isLoggedIn }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-red-900 text-black flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bgpic})`, // Setting the background image dynamically
        backgroundSize: '85%', // Zoom out effect
        backgroundPosition: 'center', // Keep the image centered
      }}
    >
      <div>
        <h1 className="text-6xl text-black font-bold">Blood Bank Management System</h1>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-center mb-4 text-lg">
          Donate Blood, Save Lives. Manage blood donations, requests, and more.
        </h2>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-white text-red-900 px-4 py-2 hover:bg-gray-300 font-semibold rounded">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-white text-red-900 px-4 py-2 hover:bg-gray-300 font-semibold rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
