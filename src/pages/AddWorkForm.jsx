import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function AddWorkForm() {
    const [workname, setWorkName] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('workname', workname);
        formData.append('experience', experience);
        formData.append('location', location);
        if (file) {
            Array.from(file).forEach((f) => formData.append('photos', f));
        }

        try {
            const Token = localStorage.getItem('loginToken');
            const userId = localStorage.getItem('userId');

            if (!Token || !userId) {
                alert("user not authenticated");
                Navigate('/Signin');
            }

            const response = await fetch(`${API_URL}work/workadding`, {
                method: 'POST',
                headers: {
                    'Token': `${Token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert("work added successfully");
                setWorkName("");
                setExperience("");
                setLocation("");
                setFile(null);
                setSuccess("Work added successfully!");
            } else {
                alert("Work is not added");
            }

        } catch (error) {
            console.error(error);
            setError("Failed to add the work");
        }
    }

    return (
        <div className="min-h-screen flex flex-col pr-20 pl-20">
            <div className="flex-grow">
                {success && <div style={{ color: 'green' }}>{success}</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form className="max-w-sm mx-auto mt-20" onSubmit={handlesubmit}>
                    <div className="mb-5">
                        <label htmlFor="workname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Workname</label>
                        <input type="text" name="workname" value={workname} onChange={(e) => setWorkName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="Software" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Experience</label>
                        <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="6" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
                        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload Photo</label>
                        <input type="file" name="photos" multiple onChange={(e) => setFile(e.target.files)} className="block w-full" />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Add</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddWorkForm;
