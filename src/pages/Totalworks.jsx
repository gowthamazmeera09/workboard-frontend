import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/data";
import LoadingSpinner from './LoadingSpinner';

function Totalworks() {
  const [avatar, setAvatar] = useState("");
  const [userdata, setUserData] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddingImages, setIsAddingImages] = useState(false); // Loading state for adding images
  const [isDeletingWork, setIsDeletingWork] = useState(false); // Loading state for deleting work
  const [isDeletingImage, setIsDeletingImage] = useState(false); // Loading state for deleting images
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all user data
  const getalldata = async () => {
    try {
      const Token = localStorage.getItem("loginToken");
      const userId = localStorage.getItem("userId");

      if (!userId || !Token) {
        alert("Authentication details missing. Please log in again.");
        navigate("/Signin");
        return;
      }

      const response = await axios.get(`${API_URL}user/single-user/${userId}`, {
        headers: {
          token: `${Token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to get user data");
    }
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  // Upload new images to an existing work entry
  const handleAddImages = async (workId) => {
    setIsAddingImages(true); // Show loading spinner
    const formData = new FormData();
    for (let i = 0; i < newImages.length; i++) {
      formData.append("photos", newImages[i]);
    }

    try {
      const Token = localStorage.getItem("loginToken");
      await axios.post(
        `${API_URL}work/addimages/${workId}`,
        formData,
        {
          headers: {
            token: `${Token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Images added successfully");
      getalldata(); // Refresh the data after adding images
    } catch (error) {

      if(error.response && error.response.status === 401){
        alert("Session expired. Please log in again.");
        localStorage.removeItem("loginToken"); 
        localStorage.removeItem("userId");
        localStorage.removeItem('imageUrl');
        setAvatar('');
        navigate('/Login')
      }
      
      console.error(error);
      alert("Failed to add images");
    } finally {
      setIsAddingImages(false); // Hide loading spinner
    }
  };

  // Delete a work entry
  const handleDeleteWork = async (workId) => {
    setIsDeletingWork(true); // Show loading spinner
    try {
      const Token = localStorage.getItem("loginToken");
      await axios.delete(`${API_URL}work/deletework/${workId}`, {
        headers: { token: `${Token}` },
      });
      alert("Work deleted successfully");
      getalldata(); // Refresh data after work deletion
    } catch (error) {
      if(error.response && error.response.status === 401){
        alert("Session expired. Please log in again.");
        localStorage.removeItem("loginToken"); 
        localStorage.removeItem("userId");
        localStorage.removeItem('imageUrl');
        setAvatar('');
        navigate('/Login')
      }
      console.error(error);
      alert("Error deleting the work");
    } finally {
      setIsDeletingWork(false); // Hide loading spinner
    }
  };

  // Delete a single image from a work
  const handleDeleteImage = async (workId, image) => {
    setIsDeletingImage(true); // Show loading spinner
    const publicId = image.split("/").pop().split(".")[0]; // Extract publicId from image URL
    try {
      const Token = localStorage.getItem("loginToken");
      await axios.post(
        `${API_URL}work/deleteimage`,
        { workId, publicId },
        {
          headers: { token: `${Token}` },
        }
      );
      alert("Image deleted successfully");
      getalldata(); // Refresh data after deleting the image
    } catch (error) {

      if(error.response && error.response.status === 401){
        alert("Session expired. Please log in again.");
        localStorage.removeItem("loginToken"); 
        localStorage.removeItem("userId");
        localStorage.removeItem('imageUrl');
        setAvatar('');
        navigate('/Login')
      }

      console.error(error);
      alert("Failed to delete image");
    } finally {
      setIsDeletingImage(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    getalldata();
  }, []);

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("imageUrl");
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  }, []);

  return (
    <div className="p-4 lg:mt-80">
      {isAddingImages && <LoadingSpinner />}
      {isDeletingWork && <LoadingSpinner />}
      {isDeletingImage && <LoadingSpinner />}
      {loading && <LoadingSpinner />} {/* Show spinner when loading */}
      <h1 className="text-2xl font-bold mb-4">Added Work Details</h1>
      {userdata && userdata.user && userdata.user.addwork && userdata.user.addwork.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userdata.user.addwork.map((work, index) => (
            <div key={index} className="bg-white p-4 border rounded shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={avatar}
                  alt="User Profile"
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-bold">{work.role}</h2>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                  <p><strong>Experience:</strong> {work.experience} years</p>
                  {work.standard && <p><strong>Standard:</strong>{work.standard}</p>}
                  {work.subject && <p><strong>Subject:</strong>{work.subject}</p>}
                  {work.vehicletype && <p><strong>VehicleType:</strong>{work.vehicletype}</p>}
                  {work.paintertype && <p><strong>Paintertype:</strong>{work.paintertype}</p>}
                  {work.cartype && <p><strong>Cartype:</strong>{work.cartype}</p>}
                  {work.biketype && <p><strong>Biketype:</strong>{work.biketype}</p>}
                  {work.autotype && <p><strong>Autotype:</strong>{work.autotype}</p>}
                  {work.shoottype && <p><strong>Shoottype</strong>{work.shoottype}</p>}
                  {work.marbultype && <p><strong>Marbultype:</strong>{work.marbultype}</p>}
                  {work.weldingtype && <p><strong>Weldingtype:</strong>{work.weldingtype}</p>}
              </div>
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {work.photos.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative min-w-[80px]">
                      <img
                        src={image}
                        alt={`work-${imgIndex}`}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedImage(image)} // Open modal with selected image
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleDeleteImage(work._id, image)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mb-4"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-4"
                onClick={() => handleAddImages(work._id)}
                disabled={isAddingImages} // Disable button while loading
              >
                {isAddingImages ? "Adding..." : "Add Images"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full mt-4"
                onClick={() => handleDeleteWork(work._id)}
                disabled={isDeletingWork} // Disable button while loading
              >
                {isDeletingWork ? "Deleting..." : "Delete Work"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No works were added</p>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close modal on click
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={selectedImage}
              alt="Selected Work"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Totalworks;
