import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [avatar, setAvatar] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

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

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-slate-500 p-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Hamburger Icon for mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="text-white text-xl font-bold ml-4">
            WorkBoard
          </div>
        </div>

        {/* Profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={toggleProfile}
            className="text-white flex items-center focus:outline-none"
          >
            <div className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                            {avatar ? (
                                <Link to="/Profile">
                                    <img src={avatar} alt="Profile" className="h-10 w-10 object-cover rounded-full" />
                                </Link>
                            ) : (
                                <span>
                                    <Link to="/Sigup" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Signup</Link> /
                                    <Link to="/Sigin" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                                </span>
                            )}
                        </div>
          </button>

          {avatar && isProfileOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
      Profile
    </Link>
    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
      Settings
    </Link>
    <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
      Logout
    </Link>
  </div>
)}

        </div>
      </nav>

      {/* Side Menu Below Navbar */}
      <div className="flex">
        {/* Sidebar */}
        <div
          ref={menuRef}
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative top-0 left-0 w-64 h-full bg-slate-800 text-white p-4 transform transition-transform lg:translate-x-0 lg:flex lg:w-64 lg:h-auto lg:p-0 lg:bg-gray-800 lg:mt-4`}
        >
          <ul className="space-y-4 lg:flex lg:flex-col">
            <li>
              <a href="#home" className="block px-2 py-1 lg:py-2">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block px-2 py-1 lg:py-2">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="block px-2 py-1 lg:py-2">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="block px-2 py-1 lg:py-2">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:ml-64">
          {/* Add your main page content here */}
          <h1 className="text-3xl font-bold">Welcome to WorkBoard</h1>
          <p>This is your main content area.</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
