import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/data';
import welcomeimage from '../images/worker-welcome-removebg-preview.png';
import {  useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null); // Initialize as null to check loading state
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();

  useEffect(() => {
    if(!userId){
      alert("user not found")
      Navigate('/')
    }
    if (userId) { // Check if userId exists
      axios.get(`${API_URL}user/single-user/${userId}`)
        .then((res) => {
          console.log(res.data)
          setUser(res.data); // Assuming res.data is an object with user details
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  return (
    <div >
      <div className='lg:mt-[-100px] lg:mx-[650px]'>
      <img src={welcomeimage} width='400px' className="welcome-image" />
      </div>
      {user ? (
        <h1 className='block mt-10 font-serif text-3xl mx-16 lg:mx-[650px]'>Welcome,{user.user.username}!</h1> // Display user name if user data is available
      ) : (
        <p>Loading user data...</p> // Show loading message if user data is not yet available
      )}
    </div>
  );
}

export default Home;
