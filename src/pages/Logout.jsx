import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';


function Logout() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {


        try {
            // Remove items from localStorage
            localStorage.removeItem('loginToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('imageUrl');

            // Redirect to login page or home page after logout
            window.location.href = '/Sigin';
        } catch (error) {
            console.error(error);
            alert("Something went wrong during logout");
        }
    };

    return (
        <div>
            {loading && <LoadingSpinner />} {/* Show spinner when loading */}
            <button onClick={handleLogout}>Logout</button>
            {error && <div className="text-red-600 mx-16 mb-5">{error}</div>}
        </div>
    );
}

export default Logout;