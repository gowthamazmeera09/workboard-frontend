import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/data';

function Totalworks() {
    const [userdata, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`${API_URL}user/single-user/${userId}`)
            .then((res) => {
                setUserData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [userId]);

    return (
        <div>
            {userdata ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{userdata.user.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{userdata.user.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{userdata.user.phonenumber}</td>
                        </tr>
                        <tr>
                            <td>Is Verified</td>
                            <td>{userdata.user.isVerified ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>{userdata.user.password}</td>
                        </tr>
                        <tr>
                            <td>Photo</td>
                            <td>
                                {userdata.user.photo && userdata.user.photo.data ? (
                                    <img
                                        src={`data:image/png;base64,${userdata.user.photo.data}`}
                                        alt="User Photo"
                                        width="100"
                                        height="100"
                                    />
                                ) : (
                                    'No Photo'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>{userdata.user._id}</td>
                        </tr>
                        <tr>
                            <td>Add Work</td>
                            <td>
                                {userdata.user.addwork && userdata.user.addwork.length > 0 ? (
                                    <ul>
                                        {userdata.user.addwork.map((work, index) => (
                                            <li key={index}>{work}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No Work Added'
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Totalworks;
