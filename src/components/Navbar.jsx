import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [avatar, setAvatar] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch avatar from localStorage when the component mounts
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

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleProfileLinkClick = () => {
    setIsProfileOpen(false);
  };

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

          {/* Dropdown Menu */}
          {avatar && isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleProfileLinkClick}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleProfileLinkClick}
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
              <Link to="/Home" className="block px-2 py-1 lg:py-2" onClick={handleMenuLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/About" className="block px-2 py-1 lg:py-2" onClick={handleMenuLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link to="/Services" className="block px-2 py-1 lg:py-2" onClick={handleMenuLinkClick}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="block px-2 py-1 lg:py-2" onClick={handleMenuLinkClick}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
