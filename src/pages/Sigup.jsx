import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { Link, useNavigate } from 'react-router-dom';


function Sigup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [file,setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();



  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    if (file) {
      formData.append('photo', file);
    }


    try {
      const response = await fetch(`${API_URL}user/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("registation successfull");
        Navigate('/Verificationpage');
        console.log(data)
        setSuccess(response.success)
      }
      else if (email) {
        alert("email already taken");
        setUsername("");
        setEmail("");
        setPassword("");
        setFile(null)
      }
      else {
        setUsername("");
        setEmail("");
        setPassword("");
        setFile(null)
      }
    } catch (error) {
      console.error(error)
      setError(true);
    }
  };
  return (
    <div>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form class="max-w-sm mx-auto mt-20 lg:mt-[-300px]" onSubmit={handleSubmit}>
        <div class="mb-5">
          <label for="username" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">username</label>
          <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your email</label>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">create a password</label>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
          <label for="phonenumber" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">your phonenumber</label>
          <input type="number" name='phonenumber' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
          <label htmlFor="photo" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Upload Photo</label>
          <input type="file" name="photo" onChange={(e) => setFile(e.target.files[0])} class="mx-16" />
        </div>


        <div className='mb-5'>
          <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Already hava an account?
            <Link to="/Sigin" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Login here</Link>
          </label>

        </div>


        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
      </form>
    </div>
  );
}

export default Sigup;
