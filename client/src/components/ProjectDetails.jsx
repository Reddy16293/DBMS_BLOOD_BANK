import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = ({ projectData }) => {
  const navigate = useNavigate();

  // Destructure the data passed to the component
  const { projectName, description, githubLink, teamSize } = projectData;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">{projectName}</h1>

        <div className="space-y-4">
          {/* Description Field */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Description:</label>
            <p className="bg-gray-700 p-4 rounded-lg">{description}</p>
          </div>

          {/* GitHub Link Field */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">GitHub Link:</label>
            {githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {githubLink}
              </a>
            ) : (
              <p className="bg-gray-700 p-4 rounded-lg">No GitHub link provided</p>
            )}
          </div>

          {/* Team Size Field */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Team Size:</label>
            <p className="bg-gray-700 p-4 rounded-lg">{teamSize}</p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-blue-500 py-3 rounded-lg text-xl text-white hover:bg-blue-600 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
