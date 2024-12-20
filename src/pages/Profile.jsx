import React, { useEffect, useState } from 'react';
import Logout from './Logout'; // Assuming you have a Logout component

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('imageUrl'); // Match key with Navbar
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

      {/* Show the profile picture if it exists */}
      {avatar ? (
        <img
          src={avatar}
          alt="Profile"
          className="h-32 w-32 object-cover rounded-full mb-6 cursor-pointer"
          onClick={() => setShowModal(true)} // Open modal on click
        />
      ) : (
        <div className="text-gray-600">No profile picture available</div>
      )}

      <Logout /> {/* This component handles logout functionality */}

      {/* Modal for displaying the avatar */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)} // Close modal on click
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={avatar}
              alt="Profile"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
