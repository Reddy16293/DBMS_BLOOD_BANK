import React, { useState, useEffect } from 'react';
import Template from '../components/Template';
import loginpic from '../assets/login.jpg';
import { useNavigate, Navigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from './Spinner'; // Import Spinner

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'donar' // Default role
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setIsLoggedIn(true);
    }
  }, []);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
  
    console.log("Submitting form with data:", formData); // Log the data being sent
  
    axios.post('http://localhost:5001/api/v1/auth/login', formData)
      .then(res => {
        console.log("Response from server:", res.data);
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        toast.success('Login successful');
      })
      .catch(err => {
        console.error("Error:", err.response ? err.response.data : err); // Log more detailed error response
        toast.error('Login failed. Please check your credentials and try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />; // Redirect to the dashboard for admin, donor, or patient
  }

  return (
    <Template
      title="Welcome to Blood Bank Management System"
      desc1="Secure and Efficient Blood Donation Management"
      desc2="Log in as Admin, Donor, or Patient"
      image={loginpic}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
      formdata={formData}
      ChangeHandler={changeHandler}
      submitHandler={submitHandler}
      loading={loading} // Pass loading state to Template
    />
  );
};

export default Login;
