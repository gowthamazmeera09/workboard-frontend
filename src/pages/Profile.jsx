import React, { useEffect, useState } from 'react';
import Logout from './Logout'; // Assuming you have a Logout component

const Profile = () => {
  const [avatar, setAvatar] = useState("");

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
          className="h-32 w-32 object-cover rounded-full mb-6" 
        />
      ) : (
        <div className="text-gray-600">No profile picture available</div>
      )}

      <Logout /> {/* This component handles logout functionality */}
    </div>
  );
};

export default Profile;
