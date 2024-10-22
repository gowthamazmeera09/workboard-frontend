import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../data/data';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
  });
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for sending
    const form = new FormData();
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('phonenumber', formData.phonenumber);
    form.append('image', image);

    try {
      const response = await axios.post(`${API_URL}user/register`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(response.data.success);
      Navigate('/Verificationpage')
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setSuccess('');
    }
  };
  return (
    <div>
    {success && <div style={{ color: 'green' }}>{success}</div>}
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <form class="max-w-sm mx-auto mt-20 lg:mt-[-120px]" onSubmit={handleSubmit}>
    <div class="mb-5">
        <label for="username" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">username</label>
        <input type="text" name='username' value={formData.username} onChange={handleChange}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Your email</label>
        <input type="email" name='email' value={formData.email} onChange={handleChange}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">create a password</label>
        <input type="password" name='password' value={formData.password} onChange={handleChange}  class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="mb-5">
        <label for="phonenumber" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">your phonenumber</label>
        <input type="number" name='phonenumber' value={formData.phonenumber}  onChange={handleChange} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="mb-5">
        <label for="image" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">your phonenumber</label>
        <input type="file" name='image' value={image} onChange={handleImageChange} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      
      <div className='mb-5'>
      <label for="password" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">Already hava an account?
        <Link to="/Sigin" className="text-sm text-blue-800  dark:text-blue-500 hover:underline"> Login here</Link>
        </label>
      
      </div>
      

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    {/* <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Profile Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit">Register</button>
    </form> */}
  </div>
  );
}

export default Signup;
