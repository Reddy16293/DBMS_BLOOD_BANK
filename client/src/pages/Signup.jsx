import React, { useState } from 'react';
import signuplogo from '../assets/signup_pic.jpg';
import Template from '../components/Template';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import Spinner from './Spinner'; // Import Spinner

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skills: '',
    password: '',
    confirmpassword: '',
    role: '',
    bloodType: '' // Added blood type to formdata
  });

  const [loading, setLoading] = useState(false); // Loading state

  const changeHandler = (event) => {
    setFormData({ ...formdata, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formdata.password !== formdata.confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading to true when the process starts

    axios.post('http://localhost:5001/auth/signup', formdata)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/login');
        } else {
          toast.error(response.data.message || 'Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('There was an error registering the user!', error);
        toast.error('Registration failed. Please try again or User Already Exists.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request is finished
      });
  };

  return (
    <Template
      title="Join the Blood Bank Management System"
      desc1="Welcome"
      desc2="Donate blood and save lives"
      image={signuplogo}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
      formdata={formdata}
      ChangeHandler={changeHandler}
      submitHandler={submitHandler}
      loading={loading} // Pass loading state to Template
    />
  );
};

export default Signup;
