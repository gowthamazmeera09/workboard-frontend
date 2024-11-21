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
            const Token = localStorage.getItem('loginToken');
            const userId = localStorage.getItem('userId');
            if (!userId || !Token) {
                alert('Authentication details missing. Please log in again.');
                navigate('/Sigin'); // Redirect to Signin page
                return;
            }
            const response = await axios.get(`${API_URL}user/single-user/${userId}`, {
                headers: {
                    'token': `${Token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to get the user data');
        }
    };

    const handleDelete = async (workId) => {
        try {
            const Token = localStorage.getItem('loginToken');
            if (!Token) {
                alert('Token is missing. Please log in again.');
                navigate('/Signin');
                return;
            }
            await axios.delete(`${API_URL}work/deletework/${workId}`, {
                headers: {
                    'token': `${Token}`,
                },
            });
            alert('Work deleted successfully');
            getalldata(); // Refresh the data after deletion
        } catch (error) {
            console.error(error);
            alert('Error deleting the work');
        }
    };

    useEffect(() => {
        getalldata();
    }, []); // Run only once on mount

    return (
        <div className="p-4">
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
                            <th className="border border-gray-300 px-4 py-2">Images</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                                <td className="border border-gray-300 px-4 py-2">
                                    {work.images && work.images.length > 0 ? (
                                        <div className="flex space-x-2">
                                            {work.images.map((image, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={`${API_URL}uploads/${image}`}
                                                    alt={`work-${imgIndex}`}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        'No Images'
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(work._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
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
