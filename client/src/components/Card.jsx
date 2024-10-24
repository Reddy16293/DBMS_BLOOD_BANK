import React from "react";
import userpic from "../assets/userpic.jpeg";
import { Navigate, useNavigate } from "react-router";

const Card = ({ profile }) => {
  const navigate = useNavigate();

  function clickHandler() {
    navigate('/view-profile',{state:{profile: profile}});
  }

  return (
    <div className="flex  border border-white shadow flex-col md:flex-row text-white overflow-hidden mx-auto justify-center items-center bg-gray-600 rounded h-min-screen md:h-[320px] w-[360px] p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col items-center md:items-start md:flex-1">
        <img
          src={userpic}
          alt="user"
          className="object-cover w-[90px] h-[90px] rounded-full mb-4"
        />
        <h3 className="text-sm font-semibold">{profile.fullname}</h3>
        <h4 className="text-xs">{profile.email}</h4>
        <h4 className="text-xs">{profile.mobile}</h4>
        <h4 className="text-xs">India</h4>
        <button
          onClick={clickHandler}
          className="bg-green-400 rounded px-4 py-1.5 mt-4 hover:bg-green-600"
        >
          View Profile
        </button>
      </div>
      <div className="flex-1 mt-4 md:mt-0 md:ml-10">
        <h4 className="text-sm font-semibold mb-2">Skills</h4>
        <ul className="list-disc pl-4">
          {profile.skills.split(",").map((skill, index) => (
            <li key={index} className="text-xs">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
