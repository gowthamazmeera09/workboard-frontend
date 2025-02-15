import React, { useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import LoadingSpinner from './LoadingSpinner';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI',
        libraries: ['places'],
      });
    
      const inputref = useRef(null);
    
      const handleOnPlacesChanged = () => {
        if (inputref.current) {
          const places = inputref.current.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            setLocation(place.formatted_address || '');
            setLat(place.geometry.location.lat());
            setLng(place.geometry.location.lng());
            setLocationSuggestions([]);
          }
        }
      };
      

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please upload a photo.');
            return;
        }

        if (!location) {
            setError('Please select or type your location.');
            return;
        }


        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phonenumber', phonenumber);
        formData.append('photo', file);
        formData.append('location', JSON.stringify({ lat, lng, address: location }));

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}user/register`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();


            if (response.ok) {
                setSuccess('Registration successful! Please verify your email.');
                setTimeout(() => {
                    navigate('/Verificationpage');
                }, 500);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Network error. Please check your connection.");
        } finally {
            setLoading(false);
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
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI`
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

    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length >= 3) {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI`
                );
                const data = await response.json();

                if (data.status === 'OK') {
                    setLocationSuggestions(data.predictions);
                } else {
                    setLocationSuggestions([]);
                }
            } catch (err) {
                console.error('Error fetching location suggestions:', err);
            }
        } else {
            setLocationSuggestions([]);
        }
    };

    const selectSuggestion = (place) => {
        setLocation(place.description);
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
        setLocationSuggestions([]);
    };

    return (
        <div>
            {loading && <LoadingSpinner />} {/* Show spinner when loading */}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://t3.ftcdn.net/jpg/04/06/91/94/240_F_406919447_kAcC5gdh1rpYlVxwMfHtUTGf24PUYSq8.jpg"
                        className="mx-auto h-24 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handlesubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    name="username"
                                    type="text"
                                    value={username}
                                    required
                                    autoComplete="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-900">
                                Phone number
                            </label>
                            <div className="mt-2">
                                <input
                                    value={phonenumber}
                                    name="phonenumber"
                                    type="number"
                                    required
                                    autoComplete="number"
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>



                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Create Password
                            </label>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-900">
                                Upload photo
                            </label>
                            <div className="mt-2">
                                <input
                                    name="photo"
                                    type="file"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={(ref) => (inputref.current = ref)}
                                onPlacesChanged={handleOnPlacesChanged}
                            >
                                <div className="mb-5">
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                        Select Your Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={handleLocationChange}
                                        className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                        required
                                    />
                                    <ul className="mt-2">
                                        {locationSuggestions.map((suggestion) => (
                                            <li
                                                key={suggestion.place_id}
                                                className="cursor-pointer text-blue-500 hover:underline"
                                                onClick={() => selectSuggestion(suggestion)}
                                            >
                                                {suggestion.description}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Use Current Location
                                    </button>
                                </div>
                            </StandaloneSearchBox>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
                            >
                                Signup
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/Login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
