import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/data';
import welcomeimage from '../images/worker-welcome-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Buttons from '../pages/Buttons';

function Home() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("User not found");
      navigate('/');
      return;
    }

    axios
      .get(`${API_URL}user/single-user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId, navigate]);

  return (
    <div className="relative">
      {/* Fixed Background Image */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-white">
        <div className="mx-auto mt-10">
          <img
            src={welcomeimage}
            width="200px"
            className="welcome-image mx-auto"
            alt="Welcome"
          />
        </div>

        {user ? (
          <div className="mt-4 text-center">
            <h1 className="font-serif text-3xl">
              Welcome, {user.user.username}!
            </h1>
            <p className="text-sm">Address: {user.location.address}</p>
          </div>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="mt-[400px] lg:m-[350px] bg-white border border-gray-400 rounded-3xl relative z-20">
        <div>
          <hr className="h-1 w-20 bg-gray-500 mx-auto mt-6" />
        </div>
        <Buttons />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
