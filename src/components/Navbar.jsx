import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaHeadset } from 'react-icons/fa';

const Navbar = () => {
  const [avatar, setAvatar] = useState('');
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
    <>
      <nav className="bg-slate-500 p-4 flex items-center justify-between bg-sticky">
        <div className="flex items-center">
          

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
                <Link to="/Signup" className="text-white dark:text-blue-500 hover:underline mr-2">Signup</Link>
                /
                <Link to="/Login" className="text-white dark:text-blue-500 hover:underline ml-2">Login</Link>
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
                to="/Help"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                Help
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
    </>
  );
};

export default Navbar;
