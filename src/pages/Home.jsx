import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/data';
import welcomeimage from '../images/worker-welcome-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Buttons from '../pages/Buttons';

function Home() {
  const [user, setUser] = useState(null); // Initialize as null to check loading state
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("User not found");
      navigate('/');
    }
    if (userId) { // Check if userId exists
      axios.get(`${API_URL}user/single-user/${userId}`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data); // Assuming res.data is an object with user details
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  return (
    <div className="relative">
      {/* Fixed Background Image */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-white">
        <div className="mx-auto mt-10">
          <img src={welcomeimage} width="200px" className="welcome-image mx-auto" alt="Welcome Image" />
        </div>
        {user ? (
          <div className="mt-4 text-center">
            <h1 className="font-serif text-3xl">Welcome, {user.username}!</h1>
            <p className="text-xl">Address: {user.location.address}</p> {/* Display the address */}
          </div>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}
      </div>
      {/* Scrollable Content */}
      <div className="mt-[400px] lg:m-[50px] bg-white border border-gray-400 rounded-3xl  relative z-20">
        <div>
          <hr className='h-1 w-20 bg-gray-500 mx-auto mt-6' />
        </div>
        <Buttons />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
