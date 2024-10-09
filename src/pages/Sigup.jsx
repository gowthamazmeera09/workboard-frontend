import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phonenumber,setPhoneNumber] = useState("");
  const Navigate = useNavigate();

  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
      const formData = {
        username,
        email,
        password,
        phonenumber
      };

      const response = await fetch(`${API_URL}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(response.ok){
        console.log(data);
        Navigate('/Verificationpage')
      }
      else if(email){
        alert("email already taken");
        setUserName("");
        setEmail("");
        setPassword("");
      }
      else if(phonenumber){
        alert("phonenumber is already taken");
        setUserName("");
        setEmail("");
        setPassword("");
      }
      else{
        setUserName("");
        setEmail("");
        setPassword("");
      }
      
    } catch (error) {
      console.log(error);
      alert("something went wrong")
    }
  }

  return (
    

<form class="max-w-sm mx-auto" onSubmit={handlesubmit}>
<div class="mb-5">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
    <input type="text" name='username' value={username} onChange={(e)=>setUserName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a password</label>
    <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="mb-5">
    <label for="phonenumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PhoneNumber</label>
    <input type="number" name='phonenumber' value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="970*******" required />
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
</form>

  );
}

export default Signup;
