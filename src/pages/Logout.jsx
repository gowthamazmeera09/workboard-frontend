import React from 'react';


function Logout() {
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
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;