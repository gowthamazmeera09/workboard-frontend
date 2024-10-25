import React, { useEffect, useState } from 'react'
import welcomeimage from '../images/workboard-main-image-removebg.png';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';


function LandingHome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const loginToken = localStorage.getItem('loginToken');
    
    if (userId && loginToken) {
      // Redirect to home if userId and loginToken are found
      Navigate('/Home');
    }
  }, [Navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Login successful!");
        
        // Save login details in localStorage
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('imageUrl', data.imageUrl);
        
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
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center my-20 lg:mt-[-100px]">
        <img src={welcomeimage} width='400px' className="welcome-image" />
        <div className='hidden lg:block'>
          <form class="max-w-sm mx-auto mt-20 lg:mt-[-40px]" onSubmit={handleSubmit}>
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
            <div className='mb-5'>
              <label for="" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Don't hava an account?
                <Link to="/Sigup" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Register here</Link>
              </label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
      <div className='mt-[-85px] lg:hidden'>
          <p className='text-3xl'>Hello,<br></br>How is your day</p>
          <br/>
          <p>Please continue to <Link to="/Sigin" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Login</Link></p>
        </div>


    </div>
  )
}

export default LandingHome;