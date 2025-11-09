import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [avatar, setAvatar] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('imageUrl');
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (event) => {
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
    navigate('/Login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 to-indigo-600 p-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold ml-4 tracking-wide">
          WorkBoard
        </div>
      </div>

      <div ref={profileRef} className="relative">
        <button
          onClick={toggleProfile}
          className="text-white flex items-center focus:outline-none"
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-10 w-10 object-cover rounded-full border-2 border-white shadow-md"
            />
          ) : (
            <span className="text-sm flex space-x-2">
              <Link to="/Signup" className="text-white hover:text-yellow-300 transition-all">Signup</Link>
              <span className="text-white">/</span>
              <Link to="/Login" className="text-white hover:text-yellow-300 transition-all">Login</Link>
            </span>
          )}
        </button>

        {avatar && isProfileOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-lg"
              onClick={() => setIsProfileOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/Help"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsProfileOpen(false)}
            >
              Help
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsProfileOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-b-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
