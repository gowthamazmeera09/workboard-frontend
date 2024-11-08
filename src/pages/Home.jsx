import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/data';
import welcomeimage from '../images/worker-welcome-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Buttons from '../pages/Buttons'

function Home() {
  const [user, setUser] = useState(null); // Initialize as null to check loading state
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();

  useEffect(() => {
    if(!userId){
      alert("user not found");
      Navigate('/');
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
    <div className="relative">
      {/* Fixed Background Image */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-white">
        <div className="mx-auto mt-10">
          <img src={welcomeimage} width="300px" className="welcome-image mx-auto" />
        </div>
        {user ? (
          <h1 className="mt-4 font-serif text-3xl text-center">
            Welcome, {user.user.username}!
          </h1> 
        ) : (
          <p className="text-center">Loading user data...</p>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="mt-[400px] lg:m-[350px] bg-gray-300 rounded-3xl  relative z-20">
        <Buttons />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
