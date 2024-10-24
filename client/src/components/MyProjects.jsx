import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token'); // Fetch JWT token from localStorage

      if (!token) {
        toast.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('localhost:5001/project/my-projects', {
          headers: {
            'x-token': token, // Include JWT in Authorization header
          },
        });
        setProjects(res.data.projects); // Assuming the response contains an array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading projects...</div>;
  }

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`); // Navigate to the project details page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>

        {projects.length === 0 ? (
          <div className="text-center text-lg">You have no projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-4">{project.projectName}</h2>
                <p className="text-gray-400 mb-2">{project.description}</p>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View on GitHub
                  </a>
                )}
                <p className="mt-4 text-gray-400">
                  Team Size: <span className="font-semibold">{project.teamSize}</span>
                </p>
                <button
                  onClick={() => handleViewProject(project._id)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  View Project
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
