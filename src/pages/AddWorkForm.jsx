import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/data';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner

function AddWorkForm() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [vehicletype, setVehicleType] = useState("");
  const [paintertype, setPainterType] = useState("");
  const [weldingtype, setWeldingType] = useState("");
  const [marbultype, setMarbulType] = useState("");
  const [cartype, setCartype] = useState("");
  const [biketype, setBiketype] = useState("");
  const [autotype, setAutotype] = useState("");
  const [shoottype, setShoottype] = useState("");
  const [files, setFiles] = useState([]); // Updated: multiple files support
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
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
    setLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append("role", role);
    formData.append("experience", experience);

    if (role === "teacher") {
      formData.append("standard", standard);
      formData.append("subject", subject);
    } else if (role === "driver") {
      formData.append("vehicletype", vehicletype);
    } else if (role === "painter") {
      formData.append("paintertype", paintertype);
    } else if (role === "marbul") {
      formData.append("marbultype", marbultype);
    } else if (role === "welder") {
      formData.append("weldingtype", weldingtype);
    } else if (role === "car mechanic") {
      formData.append("cartype", cartype);
    } else if (role === "bike mechanic") {
      formData.append("biketype", biketype);
    } else if (role === "auto mechanic") {
      formData.append("autotype", autotype);
    } else if (role === "photographer") {
      formData.append("shoottype", shoottype);
    }

    // Append multiple files
    files.forEach((file) => formData.append("photos", file));

    try {
      const userId = localStorage.getItem('userId');
      const Token = localStorage.getItem('loginToken');
      const response = await fetch(`${API_URL}work/workadding/${userId}`, {
        method: "POST",
        headers: {
          'token': `${Token}`
        },
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
    } finally {
      setLoading(false); // Set loading state to false once done
    }
  };

  return (
    <div className="min-h-screen flex flex-col pr-20 pl-20 lg:mt-[-400px]">
      {loading && <LoadingSpinner />} {/* Show loading spinner if loading is true */}
      <form className="max-w-sm mx-auto mt-24" onSubmit={handleSubmit}>
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
            <option value="mason">Mason</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="carpenter">Carpenter</option>
            <option value="AcTech">AcTech</option>
            <option value="liftTech">liftTech</option>
            <option value="agricultural labour">Agricultural labour</option>
            <option value="car mechanic">Car mechanic</option>
            <option value="bike mechanic">Bike mechanic</option>
            <option value="auto mechanic">Auto mechanic</option>
            <option value="car wash">Car wash</option>
            <option value="chief">Chief</option>
            <option value="cloths washer">Cloths washer</option>
            <option value="garden cleaner">Garden cleaner</option>
            <option value="glass cleaner">Glass cleaner</option>
            <option value="kids caretaker">Kids caretaker</option>
            <option value="old people caretaker">Old people caretaker</option>
            <option value="makeup artest">Makeup artest</option>
            <option value="photographer">Photographer</option>
            <option value="cattering">Catering</option>
            <option value="washing dishes">washing dishes</option>
            <option value="watchman">Watchman</option>

          </select>
        </div>

        {/* Conditional Form Fields based on role */}
        {role === 'teacher' && (
          <>
            <div className='mb-5'>
              <label htmlFor='standard' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Standard</label>
              <select value={standard} onChange={(e) => setStandard(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
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
            <select value={vehicletype} onChange={(e) => setVehicleType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
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
            <select value={paintertype} onChange={(e) => setPainterType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="interier">Interior</option>
              <option value="exterier">Exterior</option>
              <option value="drawing">Drawing</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </div>
        )}

        {role === 'marbul' && (
          <div className='mb-5'>
            <label htmlFor='marbultype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Marble Type</label>
            <select value={marbultype} onChange={(e) => setMarbulType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="marbul">Marble</option>
              <option value="tiles">Tiles</option>
              <option value="granite">Granite</option>
              <option value="hardwood">Hardwood</option>
              <option value="stone">Stone</option>
            </select>
          </div>
        )}

        {role === 'welder' && (
          <div className='mb-5'>
            <label htmlFor='weldingtype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Marble Type</label>
            <select value={weldingtype} onChange={(e) => setWeldingType(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="fabrication">fabrication</option>
              <option value="gaswelding">gaswelding</option>
              <option value="arcwelding">arcwelding</option>
            </select>
          </div>
        )}

        {role === 'car mechanic' && (
          <div className='mb-5'>
            <label htmlFor='cartype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Car Type</label>
            <select value={cartype} onChange={(e) => setCartype(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="maruthi suzuki">Maruthi suzuki</option>
              <option value="hundai">Hundai</option>
              <option value="tata moters">TaTa moters</option>
              <option value="mahindra">Mahindra</option>
              <option value="honda">Honda</option>
              <option value="toyota">Toyota</option>
              <option value="renualt">Renualt</option>
              <option value="volkswagan">Volkswagan</option>
              <option value="kia">Kia</option>
              <option value="scoda">Scoda</option>
            </select>
          </div>
        )}

        {role === 'bike mechanic' && (
          <div className='mb-5'>
            <label htmlFor='biketype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Bike Type</label>
            <select value={biketype} onChange={(e) => setBiketype(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="hero">Hero</option>
              <option value="honda">Honda</option>
              <option value="bajaj">Bajaj</option>
              <option value="tvs">Tvs</option>
              <option value="royal enfield">Royal Enfield</option>
              <option value="ktm">Ktm</option>
            </select>
          </div>
        )}

        {role === 'auto mechanic' && (
          <div className='mb-5'>
            <label htmlFor='autotype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Auto Type</label>
            <select value={autotype} onChange={(e) => setAutotype(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="bajaj">Bajaj</option>
              <option value="mahindra">mahindra</option>
            </select>
          </div>
        )}

        {role === 'photographer' && (
          <div className='mb-5'>
            <label htmlFor='shoottype' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Shoot Type</label>
            <select value={shoottype} onChange={(e) => setShoottype(e.target.value)} className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option value="">Select</option>
              <option value="prewedding">Prewedding</option>
              <option value="wedding">Wedding</option>
              <option value="postwedding">Postwedding</option>
              <option value="birthday">birthday</option>
              <option value="shoot">Shoot</option>
            </select>
          </div>
        )}

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
          <label htmlFor='photos' className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Photos</label>
          <input
            type="file"
            id="photos"
            multiple // Updated for multiple file uploads
            onChange={(e) => setFiles([...e.target.files])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg" disabled={loading}>
            Submit
          </button>
        </div>
      </form>

      {/* Feedback Messages */}
      {success && <div className="mt-4 p-2 bg-green-100 text-green-800">{success}</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-800">{error}</div>}

      <Footer />
    </div>
  );
}

export default AddWorkForm;
