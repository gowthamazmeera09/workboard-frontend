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
            <h1 className="text-2xl font-bold mb-4">Added Work Details</h1>
            {userdata && userdata.user && userdata.user.addwork && userdata.user.addwork.length > 0 ? (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Experience (years)</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Standard</th>
                            <th className="border border-gray-300 px-4 py-2">Subject</th>
                            <th className="border border-gray-300 px-4 py-2">Vehicle Type</th>
                            <th className="border border-gray-300 px-4 py-2">Painter Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userdata.user.addwork.map((work, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{work.role}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.experience}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.standard || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.subject || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.vehicletype || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{work.paintertype || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No works were added</p>
            )}
            <Footer />
        </div>
    );
}

export default Totalworks;
