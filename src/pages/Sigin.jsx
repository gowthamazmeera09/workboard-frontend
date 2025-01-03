import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
import LoadingSpinner from './LoadingSpinner'; // Import the loading spinner component

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await fetch(`${API_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        

        // Save login details in localStorage
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('imageUrl', data.photo);

        // Navigate to the Home page
        Navigate('/Home');

        // Reload to reflect the changes
        window.location.reload();
      } else {
        setError(data.error || "Login failed");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 lg:mt-[-200px]">
      {loading && <LoadingSpinner />} {/* Show spinner when loading */}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Display error message */}
        {error && <div className="text-red-600 mx-16 mb-5">{error}</div>}
        
        <div className="mb-5">
          <label htmlFor="register" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">
            Don't have an account?
            <Link to="/Sigup" className="text-sm text-blue-800 dark:text-blue-500 hover:underline ml-1">
              Register here
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signin;
