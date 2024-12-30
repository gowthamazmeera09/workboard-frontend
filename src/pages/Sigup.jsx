import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please upload a photo.');
      return;
    }

    if (!location) {
      setError('Please select your location.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    formData.append('photo', file);
    formData.append('location', JSON.stringify({ lat, lng, address: location }));

    try {
      const response = await fetch(`${API_URL}user/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please verify your email.');
        navigate('/Verificationpage');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    }
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBmV7j6H1UQDYVjI9zlreJn2rOOb3dNemY`
          );
          const data = await response.json();

          if (response.ok && data.status === 'OK') {
            const address = data.results[0]?.formatted_address || 'Address not found';
            setLocation(address);
            setLat(latitude);
            setLng(longitude);
          } else {
            setError('Unable to fetch location. Please try again.');
          }
        } catch (error) {
          console.error('Error fetching geolocation:', error);
          setError('An error occurred while fetching location. Please try again later.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to retrieve your location. Please enable location services or check your browser settings.');
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col pr-20 pl-20">
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form className="max-w-sm mx-auto mt-20 lg:mt-[-300px]" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@example.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Create a Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-5">
          <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Phone Number
          </label>
          <input
            type="number"
            name="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Photo Upload Field */}
        <div className="mb-5">
          <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Upload Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={(e) => setFile(e.target.files[0])}
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Location Input */}
        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Select Your Location
          </label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your address"
            className="shadow-sm bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Use Current Location
          </button>
        </div>

        {/* Submit Button */}
        <div className="mb-5">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
export default Signup;
