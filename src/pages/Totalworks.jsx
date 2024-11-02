import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
import Footer from '../components/Footer';

function Totalworks() {
    const [userdata, setUserData] = useState(null);
    const navigate = useNavigate();

    const getalldata = async () => {
        try {
            const token = localStorage.getItem('loginToken');
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert('User not found');
                navigate('/Signin'); // Corrected 'Sigin' to 'Signin'
                return;
            }
            const response = await axios.get(`${API_URL}user/single-user/${userId}`, {
                headers: {
                    'token': `${token}`
                }
            });
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to get the user data");
        }
    };

    useEffect(() => {
        getalldata();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <div>
            {userdata &&userdata.user && userdata.user.addwork && userdata.user.addwork.length > 0 ? (
                <ul>
                    {userdata.user.addwork.map((work, index) => (
                        <li key={index}>
                            Role: {work.role}, Experience: {work.experience} years, 
                            Location: {work.location}, Standard: {work.standard}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No works were added</p>
            )}
        </div>
        <div>
            <Footer />
        </div>
        </div>
    );
}

export default Totalworks;
