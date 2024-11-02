import React, { useState } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function AddWorkForm() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [vehicletype, setVehicleType] = useState("");
  const [paintertype, setPainterType] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('role', role);
    if (role === 'teacher') {
      formData.append('standard', standard);
      formData.append('subject', subject);
    }
    else if (role === 'driver') {
      formData.append('vehicletype', vehicletype);
    }
    else if (role === 'painter') {
      formData.append('paintertype', paintertype)
    }
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

      const response = await fetch(`${API_URL}work/workadding/${userId}`, {
        method: 'POST',
        headers: {
          'Token': `${Token}`
        },
        body: formData,
      });

      

      const data = await response.json();

      if (response.ok) {
        alert("work added successfully");
        setRole("select")
        setExperience("");
        setLocation("");
        setStandard("");
        setSubject("");
        setVehicleType("");
        setPainterType("");
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
    <div className="min-h-screen flex flex-col pr-20 pl-20 lg:mt-[-400px]">
      <div className="flex-grow">
        {success && <div style={{ color: 'green' }}>{success}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form className="max-w-sm mx-auto mt-20" onSubmit={handlesubmit}>
          <div className='mb-5'>
            <label htmlFor='role' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Role</label>
            <select name='role' value={role} onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required>
              <option value="">Select</option>
              <option value="teacher">teacher</option>
              <option value="driver">driver</option>
              <option value="painter">painter</option>
            </select>
          </div>
          {role === 'teacher' && (
            <>
              <div className="mb-5">
                <label htmlFor="standard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Standard</label>
                <select name='standard' value={standard} onChange={(e) => setStandard(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required>
                  <option value="">select</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4st</option>
                  <option value="5th">5st</option>
                  <option value="6th">6st</option>
                  <option value="7th">7st</option>
                  <option value="8th">8st</option>
                  <option value="9th">9st</option>
                  <option value="10th">10st</option>
                  <option value="All">All</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Subject</label>
                <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="maths" required />
              </div>
            </>
          )}
          {role === 'driver' && (
            <>
            <div className="mb-5">
            <label htmlFor="vehicletype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">VehicleType</label>
            <select name="vehicletype" value={vehicletype} onChange={(e) => setVehicleType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required>
              <option value="">select</option>
              <option value="scooty">Scooty</option>
              <option value="bike">Bike</option>
              <option value="appiauto">Appi Auto</option>
              <option value="5-seat-car">5 seat-car</option>
              <option value="7-seat-car">7 seat-car</option>
              <option value="tractor">Tractor</option>
              <option value="bus">Bus</option>
              <option value="lorry">Lorry</option>
            </select>
          </div>
            </>
          )}
          {role === 'painter' && (
            <>
            <div className="mb-5">
            <label htmlFor="paintertype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Painter Type</label>
            <select name="paintertype" value={paintertype} onChange={(e) => setPainterType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="6" required>
              <option value="">select</option>
              <option value="interier">Interier</option>
              <option value="exterier">Exterier</option>
              <option value="drawing">Drawing</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </div>
            </>
          )}
          <div className="mb-5">
            <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Experience</label>
            <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="6" required />
          </div>

          <div className="mb-5">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
            <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required />
          </div>

          <div className="mb-5">
            <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload Photo</label>
            <input type="file" name="photos" multiple onChange={(e) => setFile(e.target.files)} className="block w-full" />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-small sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddWorkForm;



