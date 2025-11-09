import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
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

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => password.length >= 6;
    const validateFile = (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!username || username.length < 3) {
                setError('Username must be at least 3 characters long.');
                return;
            }

            if (!validateEmail(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            if (!validatePhoneNumber(phonenumber)) {
                setError('Please enter a valid 10-digit phone number.');
                return;
            }

            if (!validatePassword(password)) {
                setError('Password must be at least 6 characters long.');
                return;
            }

            if (!file) {
                setError('Please upload a photo.');
                return;
            }

            if (!validateFile(file)) {
                setError('Please upload a valid image file (JPEG, PNG, or JPG).');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('Photo size should be less than 5MB.');
                return;
            }

            if (!location) {
                setError('Please select or type your location.');
                return;
            }

            const formData = new FormData();
            formData.append('username', username.trim());
            formData.append('email', email.trim());
            formData.append('password', password);
            formData.append('phonenumber', phonenumber);
            formData.append('photo', file);
            formData.append('location', JSON.stringify({ lat, lng, address: location }));

            const response = await fetch(`${API_URL}user/register`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const contentType = response.headers.get("content-type");
            let data = null;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                throw new Error("Server response was not in JSON format");
            }

            if (response.ok) {
                setSuccess('Registration successful! Please verify your email.');
                setTimeout(() => navigate('/Verificationpage'), 500);
            } else {
                const errorMessage = data.error || data.message || "Registration failed. Please try again.";
                if (response.status === 409) {
                    setError("This email is already registered. Please use a different email.");
                } else {
                    setError(errorMessage);
                }
            }
        } catch (error) {
            if (!navigator.onLine) {
                setError("You appear to be offline. Please check your internet connection.");
            } else {
                setError(error.message || "An unexpected error occurred. Please try again later.");
            }
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
                } catch {
                    setError('An error occurred while fetching location.');
                }
            },
            () => setError('Unable to retrieve your location.')
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
            } catch {}
        } else {
            setLocationSuggestions([]);
        }
    };

    const selectSuggestion = (place) => {
        setLocation(place.description);
        setLocationSuggestions([]);
    };

    return (
        <div>
            {loading && <LoadingSpinner />}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Signup"
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
                            <label className="block text-sm font-medium text-gray-900">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Phone number</label>
                            <input
                                type="number"
                                required
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Create Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Upload photo</label>
                            <input
                                type="file"
                                required
                                onChange={(e) => setFile(e.target.files[0])}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                            />
                        </div>

                        {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={(ref) => (inputref.current = ref)}
                                onPlacesChanged={handleOnPlacesChanged}
                            >
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Select Your Location
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={handleLocationChange}
                                        className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base"
                                        required
                                    />
                                    <ul className="mt-2">
                                        {locationSuggestions.map((s) => (
                                            <li
                                                key={s.place_id}
                                                className="cursor-pointer text-blue-500"
                                                onClick={() => selectSuggestion(s)}
                                            >
                                                {s.description}
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

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold"
                        >
                            Signup
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/Login" className="font-semibold text-indigo-600">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
