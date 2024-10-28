import React, { useState } from 'react'
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';

function AddWorkForm() {
    const [workname, setWorkName] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const Token = localStorage.getItem('loginToken');
            const userId = localStorage.getItem('userId');

            if(!Token || !userId){
                alert("user not authenticated");
                Navigate('/Sigin')

            }

            const response = await fetch(`${API_URL}work/workadding`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Token':`${Token}`
                },
                body: JSON.stringify({ workname, experience, location })
            });

            const data = await response.json();

            if (response.ok) {
                setWorkName("");
                setExperience("");
                setLocation("");
                console.log(data)
                alert("work added successfully");
                setSuccess(response.success)
            }
            else {
                setWorkName("");
                setExperience("");
                setLocation("");
            }

        } catch (error) {
            console.error(error);
            setError(true);
            alert("failed to add the work")
        }
    }
    return (
        <div>
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form class="max-w-sm mx-auto mt-20 lg:mt-[-250px]" onSubmit={handlesubmit}>
                <div class="mb-5">
                    <label for="workname" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">workname</label>
                    <input type="text" name='workname' value={workname} onChange={(e) => setWorkName(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="software" required />
                </div>
                <div class="mb-5">
                    <label for="experience" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">experience</label>
                    <input type="number" name='experience' value={experience} onChange={(e) => setExperience(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6" required />
                </div>
                <div class="mb-5">
                    <label for="location" class="block mb-2 text-sm font-medium mx-16 text-gray-900 dark:text-black">location</label>
                    <input type="location" name='location' value={location} onChange={(e) => setLocation(e.target.value)} class="bg-gray-50 border border-gray-300 mx-16 text-gray-900 text-sm rounded-lg  w-60 focus:ring-blue-500 focus:border-blue-500 block w-medium lg:w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 mx-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </form>
        </div>
    )
}

export default AddWorkForm;