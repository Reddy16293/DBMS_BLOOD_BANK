import React, { useState } from 'react';
import axios from 'axios';
import ProjectDetails from './ProjectDetails'; // Use the ProjectDetails component to display created project
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Use hot-toast instead of toastify

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    githubLink: '',
    teamSize: ''
  });
  const [createdProject, setCreatedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token');

      // Call API to create a project with JWT in Authorization header
      const res = await axios.post('http://localhost:5001/project/create-project', formData, {
        headers: {
          'x-token': token, // Include the JWT token here
        },
      });

      // Set created project details for display
      setCreatedProject(res.data);
      toast.success('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  // If project is created, display ProjectDetails component
  if (createdProject) {
    return <ProjectDetails projectData={createdProject} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="flex flex-col">
            <label htmlFor="projectName" className="text-lg font-semibold">Project Name</label>
            <input
              type="text"
              name="projectName"
              id="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-lg text-white"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-lg text-white"
              rows="4"
              required
            ></textarea>
          </div>

          {/* GitHub Link */}
          <div className="flex flex-col">
            <label htmlFor="githubLink" className="text-lg font-semibold">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              id="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-lg text-white"
            />
          </div>

          {/* Team Size */}
          <div className="flex flex-col">
            <label htmlFor="teamSize" className="text-lg font-semibold">Team Size</label>
            <input
              type="number"
              name="teamSize"
              id="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-lg text-white"
              required
            />
          </div>

          {/* Submit and Back buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`bg-blue-500 py-3 px-6 rounded-lg text-xl text-white w-full transition duration-300 ${
                loading ? 'opacity-50' : 'hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-red-500 py-3 px-6 rounded-lg text-xl text-white w-full hover:bg-red-600 transition duration-300"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
