import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // Remove BrowserRouter here
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import MyProfile from "./pages/MyProfile";
import ViewProfile from "./pages/ViewProfile";
import Contact from "./pages/Contact";
import { EditProfile } from "./pages/EditProfile";
import About from "./pages/About";
import Projects from "./pages/Projects";
import FriendsList from "./components/FriendsList";
import CreateProject from "./components/CreateProject";
import MyProjects from "./components/MyProjects";
import Requests from "./pages/Requests";
import SearchResults from "./pages/SearchResults";
import Search from "./components/Search";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-black">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <FriendsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-project"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <CreateProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-projects"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MyProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Requests />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SearchResults />
            </PrivateRoute>
          }
        />
        
        <Route path='/contact' element={<Contact />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<SearchResults />} />
        
      </Routes>
    </div>
  );
};

export default App;
