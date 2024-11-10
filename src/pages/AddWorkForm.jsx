import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/data';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function AddWorkForm() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [painterType, setPainterType] = useState("");
  const [weldingtype, setWeldingType] = useState("");
  const [marbultype, setMarbulType] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const locationState = useLocation().state;

  useEffect(() => {
    // Set default role if passed from Buttons component
    if (locationState && locationState.role) {
      setRole(locationState.role);
    }
  }, [locationState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("role", role);
    formData.append("experience", experience);
    formData.append("location", location);
    formData.append("file", file);

    if (role === "teacher") {
      formData.append("standard", standard);
      formData.append("subject", subject);
    } else if (role === "driver") {
      formData.append("vehicleType", vehicleType);
    } else if (role === "painter") {
      formData.append("painterType", painterType);
    }
    else if (role === 'marbul') {
      formData.append('marbultype', marbultype);
    }
    else if (role === 'welder') {
      formData.append('weldingtype', weldingtype)
    }

    try {
      const response = await fetch(`${API_URL}/work/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Work added successfully!");
        navigate('/');
      } else {
        setError(data.message || "Failed to add work.");
      }
    } catch (error) {
      setError("Error: Unable to add work.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pr-20 pl-20 lg:mt-[-400px]">
      <form className="max-w-sm mx-auto mt-20" onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='role' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Role</label>
          <select
            name='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required>
            <option value="">Select</option>
            <option value="teacher">Teacher</option>
            <option value="driver">Driver</option>
            <option value="painter">Painter</option>
            <option value="marbul">Marbul</option>
            <option value="welder">Welder</option>
            <option value="mason">mason</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="carpenter">Carpenter</option>
          </select>
        </div>

        {/* Conditional Form Fields based on role */}
        {role === 'teacher' && (
          <>
            <div className='mb-5'>
              <label htmlFor='standard' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Standard</label>
              <select value={standard} onClick={(e) => setStandard(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
                <option value="">Select</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="All">All</option>
              </select>
            </div>
            <div className='mb-5'>
              <label htmlFor='subject' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
          </>
        )}

        {role === 'driver' && (
          <div className='mb-5'>
            <label htmlFor='vehicleType' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Vehicle Type</label>
            <select value={vehicleType} onClick={(e) => setVehicleType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="bike">Bike</option>
              <option value="scooty">Scooty</option>
              <option value="auto">Auto</option>
              <option value="appiauto">AppiAuto</option>
              <option value="5-seat-car">5 seat-car</option>
              <option value="7-seat-car">7 seat-car</option>
              <option value="tractor">Tractor</option>
              <option value="bus">Bus</option>
              <option value="lorry">Lorry</option>
            </select>
          </div>
        )}

        {role === 'painter' && (
          <div className='mb-5'>
            <label htmlFor='painterType' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Painter Type</label>
            <select value={painterType} onClick={(e) => setPainterType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="interier">Interier</option>
              <option value="exterier">Exterier</option>
              <option value="drawing">Drawing</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </div>
        )}
        {role === 'marbul' && (
          <div className='mb-5'>
            <label htmlFor='marbultype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Painter Type</label>
            <select value={marbultype} onClick={(e) => setMarbulType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="marbul">Marbul</option>
              <option value="tiles">Tiles</option>
              <option value="granite">Granite</option>
              <option value="hardwood">Hardwood</option>
              <option value="stone">Stone</option>
            </select>
          </div>
        )}

        {role === 'welder' && (
          <div className='mb-5'>
            <label htmlFor='weldingtype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Painter Type</label>
            <select value={weldingtype} onClick={(e) => setWeldingType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="fabrication">Fabrication</option>
              <option value="gaswelding">Gaswelding</option>
              <option value="arcwelding">Arcwelding</option>
            </select>
          </div>
        )}

        {/* Shared Form Fields */}
        <div className='mb-5'>
          <label htmlFor='experience' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Experience</label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='location' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='file' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload Photo</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>

        {success && <p className="text-green-500 mt-5">{success}</p>}
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
      <Footer />
    </div>
  );
}

export default AddWorkForm;
