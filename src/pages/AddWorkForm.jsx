import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../data/data';

const AddWorkForm = () => {
    const [workname, setWorkname] = useState('');
    const [subworkOptions, setSubworkOptions] = useState([]);
    const [subworkname, setSubworkname] = useState('');
    const [experience, setExperience] = useState('');

    useEffect(() => {
        if (workname) {
            axios.get(`${API_URL}/Addwork/subwork-options/${workname}`)
                .then(response => {
                    setSubworkOptions(Array.isArray(response.data.subworkOptions) ? response.data.subworkOptions : []);
                })
                .catch(error => {
                    console.error('Error fetching subwork options:', error);
                    setSubworkOptions([]); // Ensure it remains an array on error
                });
        } else {
            setSubworkOptions([]); // Reset if no workname is selected
        }
    }, [workname]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!workname || !subworkname || !experience) {
            alert('Please fill all fields');
            return;
        }
        try {
            await axios.post(`${API_URL}/Addwork/addwork`, { workname, subworkname, experience });
            alert('Work added successfully');
        } catch (error) {
            console.error('Error adding work:', error);
            alert('Failed to add work');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Work Name</label>
                <select value={workname} onChange={e => setWorkname(e.target.value)}>
                    <option value="">Select Workname</option>
                    <option value="teacher">Teacher</option>
                    <option value="driver">Driver</option>
                </select>
            </div>
            <div>
                <label>Subwork Name</label>
                <select value={subworkname} onChange={e => setSubworkname(e.target.value)}>
                    <option value="">Select Subwork</option>
                    {Array.isArray(subworkOptions) && subworkOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Experience</label>
                <input type="text" value={experience} onChange={e => setExperience(e.target.value)} />
            </div>
            <button type="submit">Add Work</button>
        </form>
    );
};

export default AddWorkForm;
