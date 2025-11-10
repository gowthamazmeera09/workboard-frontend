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
    const inputRef = useRef(null);

    const GOOGLE_KEY = 'AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI';

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI,
        libraries: ['places'],
    });

    // ✅ Place selected from dropdown → Fetch full place details
    const selectSuggestion = async (place) => {
        setLocation(place.description);

        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI`
            );
            const data = await res.json();

            if (data.result?.geometry?.location) {
                setLat(data.result.geometry.location.lat);
                setLng(data.result.geometry.location.lng);
            }
        } catch (err) {
            console.error("Place details error:", err);
        }

        setLocationSuggestions([]);
    };

    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length < 3) {
            setLocationSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI`
            );
            const data = await response.json();

            if (data.status === "OK") {
                setLocationSuggestions(data.predictions);
            } else {
                setLocationSuggestions([]);
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }
    };

    // ✅ Get current location from browser
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const res = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDEIxNcqh3HrwRDnWTkyRxK4EAzzcRfRFI`
                    );
                    const data = await res.json();

                    if (data.status === "OK") {
                        setLocation(data.results[0].formatted_address);
                        setLat(latitude);
                        setLng(longitude);
                    }
                } catch (err) {
                    console.error(err);
                }
            },
            () => {
                setError("Please enable location access.");
            }
        );
    };

    // ✅ Send form to backend in correct format
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please upload a photo.");
            return;
        }
        if (!location || !lat || !lng) {
            setError("Please select a valid location.");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phonenumber", phonenumber);
        formData.append("photo", file);

        // ✅ Correct location format to match backend
        formData.append(
            "location",
            JSON.stringify({
                type: "Point",
                coordinates: [lng, lat],
                address: location,
            })
        );

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}user/register`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! Please verify your email.");
                setTimeout(() => navigate("/Verificationpage"), 700);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <LoadingSpinner />}
            {success && <div style={{ color: "green" }}>{success}</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://t3.ftcdn.net/jpg/04/06/91/94/240_F_406919447_kAcC5gdh1rpYlVxwMfHtUTGf24PUYSq8.jpg"
                        className="mx-auto h-24 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Phone number
                            </label>
                            <input
                                type="number"
                                required
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                            />
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Upload Photo
                            </label>
                            <input
                                type="file"
                                required
                                onChange={(e) => setFile(e.target.files[0])}
                                className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                            />
                        </div>

                        {/* Location */}
                        {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={(ref) => (inputRef.current = ref)}
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">
                                        Select Your Location
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={location}
                                        onChange={handleLocationChange}
                                        className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5"
                                    />

                                    {/* Suggestions */}
                                    <ul className="mt-2 bg-white border rounded">
                                        {locationSuggestions.map((s) => (
                                            <li
                                                key={s.place_id}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
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
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
                        >
                            Signup
                        </button>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/Login"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
