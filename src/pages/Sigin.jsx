import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';

function Sigin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const Navigate = useNavigate("");

  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
      const responce = await fetch(`${API_URL}user/login`,{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({email,password})
      });
      const data = await responce.json();
      if(responce.ok){
        alert("Login successfull");
        console.log(data);
        Navigate('/Images')
      }
      
    } catch (error) {
      console.error(error);
      alert("Login failure");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <form class="max-w-sm mx-auto mt-20 lg:mt-[-40px]" onSubmit={handlesubmit}>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your email</label>
        <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className='mb-5'>
      <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Don't hava an account?
        <Link to="/Sigup" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Register here</Link>
        </label>
      
      </div>
      

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
}

export default Sigin;
