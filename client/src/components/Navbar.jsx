import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/Logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa'; // Importing search icon

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('developers');
  const [selectedSkill, setSelectedSkill] = useState('');
  const menuRef = useRef(null);

  const skills = ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(searchQuery.trim())}&type=${searchType}${
          searchType === 'skills' && selectedSkill ? `&skill=${encodeURIComponent(selectedSkill)}` : ''
        }`
      );
      setSearchQuery('');
      setSearchType('developers');
      setSelectedSkill('');
    } else {
      toast.error('Please enter a search query');
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      {/* Show Logo only when not logged in */}
      {!isLoggedIn && (
        <Link to='/' className='block'>
          <img src={logo} alt='Logo' width={160} height={32} loading='lazy' />
        </Link>
      )}

      {/* Search Bar */}
      {isLoggedIn && (
        <form onSubmit={handleSearch} className='flex items-center mx-4 flex-grow'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search projects, developers...'
            className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            aria-label='Search projects and developers'
          />
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSelectedSkill('');
            }}
            className='ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          >
            <option value='developers'>Developers</option>
            <option value='projects'>Projects</option>
            <option value='skills'>Skills</option>
          </select>
          {/* Search Icon */}
          <button type='submit' className='ml-2 p-2 bg-transparent text-blue-500 hover:text-blue-600'>
            <FaSearch size={20} />
          </button>
        </form>
      )}

      {/* Mobile Menu */}
      <div className="relative md:hidden text-right" ref={menuRef}>
        <button onClick={toggleMenu} className="text-pink-200 text-2xl">
          ☰
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 bg-gray-700 p-4 rounded shadow-lg">
            <ul className='flex flex-col text-right'>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to='/' className='hover:text-blue-400 transition duration-300'>Home</Link>
                  </li>
                  <li>
                    <Link to='/dashboard' className='hover:text-blue-400 transition duration-300'>Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/projects' className='hover:text-blue-400 transition duration-300'>Projects</Link>
                  </li>
                  <li>
                    <Link to='/create-project' className='hover:text-blue-400 transition duration-300'>Create Project</Link>
                  </li>
                  <li>
                    <Link to='/myprofile' className='hover:text-blue-400 transition duration-300'>My Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='hover:text-blue-400 transition duration-300'>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/' className='hover:text-blue-400 transition duration-300'>Home</Link>
                  </li>
                  <li>
                    <Link to='/about' className='hover:text-blue-400 transition duration-300'>About</Link>
                  </li>
                  <li>
                    <Link to='/contact' className='hover:text-blue-400 transition duration-300'>Contact</Link>
                  </li>
                  <li>
                    <Link to='/login' className='hover:text-blue-400 transition duration-300'>Login</Link>
                  </li>
                  <li>
                    <Link to='/signup' className='hover:text-blue-400 transition duration-300'>Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <nav className='hidden md:flex'>
        <ul className='text-pink-200 flex gap-4'>
          {!isLoggedIn && (
            <>
             <li>
                    <Link to='/' className='hover:text-blue-400 transition duration-300'>Home</Link>
                  </li>
             
              <li>
                <Link to='/about' className='hover:text-blue-400 transition duration-300'>About</Link>
              </li>
              <li>
                <Link to='/contact' className='hover:text-blue-400 transition duration-300'>Contact</Link>
              </li>
              <li>
                <Link to='/login' className='hover:text-blue-400 transition duration-300'>Login</Link>
              </li>
              <li>
                <Link to='/signup' className='hover:text-blue-400 transition duration-300'>Signup</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to='/' className='hover:text-blue-400 transition duration-300'>Home</Link>
              </li>
              <li>
                <Link to='/dashboard' className='hover:text-blue-400 transition duration-300'>Dashboard</Link>
              </li>
              <li>
                <Link to='/projects' className='hover:text-blue-400 transition duration-300'>Projects</Link>
              </li>
              <li>
                <Link to='/create-project' className='hover:text-blue-400 transition duration-300'>Create Project</Link>
              </li>
              <li>
                <Link to='/myprofile' className='hover:text-blue-400 transition duration-300'>My Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className='hover:text-blue-400 transition duration-300'>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
