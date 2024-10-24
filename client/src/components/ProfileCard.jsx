import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full lg:w-1/2 mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
        <div className="flex-grow">
          <div className="bg-gray-700 p-2 rounded mb-2 text-white">
            Name: <span className="ml-2">Your Name</span>
          </div>
          <div className="bg-gray-700 p-2 rounded mb-2 text-white">
            Email: <span className="ml-2">your.email@example.com</span>
          </div>
          <div className="bg-gray-700 p-2 rounded text-white">
            Skills: <span className="ml-2">React, Node.js, etc.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
