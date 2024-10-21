import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const [images, setImages] = useState([]);
  const Navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phonenumber', phonenumber);
      formData.append('image', selectedFile);

        
      const response = await fetch(`${API_URL}user/register`,{
        method:'POST',
        body:formData
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        Navigate('/Verificationpage');
      } else if (email) {
        alert("Email already taken");
        setUserName("");
        setEmail("");
        setPassword("");
      } else if (phonenumber) {
        alert("Phone number is already taken");
        setUserName("");
        setEmail("");
        setPassword("");
      } else {
        setUserName("");
        setEmail("");
        setPassword("");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <form className=" max-w-md  mx-auto mt-20 lg:mt-[-100px]  " onSubmit={handlesubmit}>

      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Username</label>
        <input type="text" name='username' value={username} onChange={(e) => setUserName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 mx-16 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your email</label>
        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 mx-16 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Create a password</label>
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 mx-16 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="mb-5">
        <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Phone Number</label>
        <input type="number" name='phonenumber' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 mx-16 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="970*******" required />
      </div>
      <div class="mb-5">
        <label for="image" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your email</label>
        <input type="file"   onChange={(e)=>setSelectedFile(e.target.files[0])}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      
      <div className='mb-5'>
      <label for="" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Already hava an account!
        <Link to="/Sigin" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Login</Link>
        </label>
      
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
    </form>
  );
}

export default Signup;
