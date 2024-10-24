import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // For better error feedback

const Projects = () => {
  const [projects, setProjects] = useState([]); // State to hold projects
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/project/all', {
          headers: {
            'x-token': token, // Add the token to the Authorization header
          },
        });

        setProjects(response.data.projects); // Assuming the response contains an array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects');
        toast.error('Failed to load projects'); // Display toast notification for the error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <p>Loading projects...</p>; // Loading state
  }

  if (error) {
    return <p>{error}</p>; // Error state
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold flex justify-center text-gray-100">Projects Opened</h1>
      <div className="bg-gray-100 p-4 rounded-md mt-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={project._id}
              className={`p-4 flex flex-col md:flex-row justify-between items-start md:items-center mb-4 rounded-md shadow-sm ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
              }`}
            >
              <div className="flex-1 mb-2 md:mb-0">
                <h2 className="text-lg font-bold">{`Project name: ${project.projectName}`}</h2>
                <p className="text-gray-600">{`Description: ${project.description}`}</p>
                <p className="text-gray-600">{`GitHub: ${project.githubLink}`}</p>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded w-full md:w-auto">View Project</button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
