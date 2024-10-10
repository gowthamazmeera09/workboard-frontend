import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

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
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="sidebar"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="text-white text-xl font-bold ml-4">
            WorkBoard
          </div>
        </div>

        {/* Profile dropdown */}
        <div ref={profileRef} className="relative ">
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
                                    <Link to="/Sigup" className="text-sm text-white dark:text-blue-500 hover:underline">Sigup/</Link>
                                    <Link to="/Sigin" className="text-sm text-white dark:text-blue-500 hover:underline">Login</Link>
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
          } fixed lg:relative top-[-16px] left-0 w-64 h-full bg-slate-800 text-white p-4 transform transition-transform lg:translate-x-0 lg:flex lg:w-64 lg:h-auto lg:p-0 lg:bg-gray-800 lg:mt-4 z-50`}
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

        
      </div>
    </>
  );
};

export default Navbar;
