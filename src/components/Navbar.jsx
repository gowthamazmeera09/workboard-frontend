import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiPhone, FiPeople } from 'react-icons/fi';
import { IoIosPeople } from "react-icons/io";

const Navbar = () => {
  const [avatar, setAvatar] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('imageUrl');
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('imageUrl');
    setAvatar('');
    setIsProfileOpen(false);
    navigate('/Sigin');
  };

  return (
    <>
      <nav className="bg-slate-500 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="sidebar"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <div className="text-white text-xl font-bold ml-4">
            WorkBoard
          </div>
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={toggleProfile}
            className="text-white flex items-center focus:outline-none"
          >
            {avatar ? (
              <img src={avatar} alt="Profile" className="h-10 w-10 object-cover rounded-full" />
            ) : (
              <span className="text-sm">
                <Link to="/Sigup" className="text-white dark:text-blue-500 hover:underline mr-2">Signup</Link>
                /
                <Link to="/Sigin" className="text-white dark:text-blue-500 hover:underline ml-2">Login</Link>
              </span>
            )}
          </button>

          {avatar && isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex">
        <div
          ref={menuRef}
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative top-0 left-0 w-64 h-full  bg-slate-800 text-white p-4 transform transition-transform lg:translate-x-0 lg:flex lg:w-64 lg:h-auto lg:p-0 lg:bg-transparent z-50`}
        >
          <ul className="space-y-4 lg:flex lg:flex-col lg:mt-28 mt-20">
            <li>
              <Link to="/Home" className="flex items-center px-2 py-1 lg:py-2 text-white px-10 " onClick={() => setIsMenuOpen(false)}>
                <FiHome className="mr-2 lg:text-black text-4xl" /> <p className='lg:text-black text-white'>Home</p>
              </Link>
            </li>
            {/* <li>
              <Link to="/About" className="block px-2 py-1 lg:py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li> */}
            <li>
              <Link to="/About" className="flex items-center px-2 py-1 lg:py-2 text-white pt-10 px-10 lg:pt-10" onClick={() => setIsMenuOpen(false)}>
              <IoIosPeople className="mr-2  lg:text-black text-4xl" /> <p className='lg:text-black text-white'>AboutUs</p>
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="flex items-center px-2 py-1 lg:py-2 text-white pt-10 px-10 lg:pt-10" onClick={() => setIsMenuOpen(false)}>
                <FiPhone className="mr-2  lg:text-black text-4xl" /> <p className='lg:text-black text-white'>Contact</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
