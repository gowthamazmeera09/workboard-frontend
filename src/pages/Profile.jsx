import React, { useEffect, useState } from 'react'
import Logout from './Logout';

function Profile() {
    const [avatar,setAvatar] = useState("");
  useEffect(()=>{
    const storedProfilePicture = localStorage.getItem('profilePicture');
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  },[])
  return (
    <div>
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
    <Logout />
  </div>
  )
}

export default Profile;