import React from 'react';
import { Navigate } from 'react-router-dom';
import ViewProfile from '../pages/ViewProfile';

const PrivateRoute = ({ isLoggedIn, children }) => {
  // Check if the user is logged in
  if (isLoggedIn) {
    // If the user is logged in, render the children
    return children;
  } else {
    // If the user is not logged in, navigate to the login page
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
