import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/data";

function Totalworks() {
  const [avatar, setAvatar] = useState('');
  const [userdata, setUserData] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [newImages, setNewImages] = useState([]);
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
    const formData = new FormData();
    for (let i = 0; i < newImages.length; i++) {
      formData.append("photos", newImages[i]);
    }

    try {
      const Token = localStorage.getItem("loginToken");
      const response = await axios.post(
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
      console.error(error);
      alert("Failed to add images");
    }
  };

  // Delete a work entry
  const handleDeleteWork = async (workId) => {
    try {
      const Token = localStorage.getItem("loginToken");
      await axios.delete(`${API_URL}work/deletework/${workId}`, {
        headers: { token: `${Token}` },
      });
      alert("Work deleted successfully");
      getalldata(); // Refresh data after work deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting the work");
    }
  };

  // Delete a single image from a work
  const handleDeleteImage = async (workId, image) => {
    const publicId = image.split('/').pop().split('.')[0]; // Extract publicId from image URL
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
      console.error(error);
      alert("Failed to delete image");
    }
  };

  useEffect(() => {
    getalldata();
  }, []);
   useEffect(() => {
      const storedProfilePicture = localStorage.getItem('imageUrl');
      if (storedProfilePicture) {
        setAvatar(storedProfilePicture);
      }
    }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Added Work Details</h1>
      {userdata && userdata.user && userdata.user.addwork && userdata.user.addwork.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userdata.user.addwork.map((work, index) => (
            <div key={index} className="bg-white p-4 border rounded shadow-md">
              <div className="flex items-center mb-4">
                <img src={avatar}
                  alt="User Profile"
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-bold">{work.role}</h2>
                  <p className="text-sm text-gray-500">{work.location}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <p><strong>Experience:</strong> {work.experience} years</p>
                <p><strong>Standard:</strong> {work.standard || "N/A"}</p>
                <p><strong>Subject:</strong> {work.subject || "N/A"}</p>
              </div>
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {work.photos.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative min-w-[80px]">
                      <img
                        src={image}
                        alt={`work-${imgIndex}`}
                        className="w-20 h-20 object-cover rounded"
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
              >
                Add Images
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full mt-4"
                onClick={() => handleDeleteWork(work._id)}
              >
                Delete Work
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No works were added</p>
      )}
    </div>
  );
}

export default Totalworks;
