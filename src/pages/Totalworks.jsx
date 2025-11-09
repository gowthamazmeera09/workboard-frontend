import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/data";
import LoadingSpinner from './LoadingSpinner';

function Totalworks() {
  const [avatar, setAvatar] = useState("");
  const [userdata, setUserData] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddingImages, setIsAddingImages] = useState(false);
  const [isDeletingWork, setIsDeletingWork] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const navigate = useNavigate();

  const getalldata = useCallback(async () => {
    try {
      const Token = localStorage.getItem("loginToken");
      const userId = localStorage.getItem("userId");

      if (!userId || !Token) {
        alert("Authentication details missing. Please log in again.");
        navigate("/Signin");
        return;
      }

      const response = await axios.get(`${API_URL}user/single-user/${userId}`, {
        headers: { token: `${Token}` },
      });

      setUserData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to get user data");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleAddImages = async (workId) => {
    setIsAddingImages(true);

    const formData = new FormData();
    for (let i = 0; i < newImages.length; i++) {
      formData.append("photos", newImages[i]);
    }

    try {
      const Token = localStorage.getItem("loginToken");

      await axios.post(`${API_URL}work/addimages/${workId}`, formData, {
        headers: {
          token: `${Token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Images added successfully");
      getalldata();
    } catch (error) {
      console.error(error);
      alert("Failed to add images");
    } finally {
      setIsAddingImages(false);
    }
  };

  const handleDeleteWork = async (workId) => {
    setIsDeletingWork(true);

    try {
      const Token = localStorage.getItem("loginToken");

      await axios.delete(`${API_URL}work/deletework/${workId}`, {
        headers: { token: `${Token}` },
      });

      alert("Work deleted successfully");
      getalldata();
    } catch (error) {
      console.error(error);
      alert("Error deleting the work");
    } finally {
      setIsDeletingWork(false);
    }
  };

  const handleDeleteImage = async (workId, image) => {
    setIsDeletingImage(true);

    const publicId = image.split("/").pop().split(".")[0];

    try {
      const Token = localStorage.getItem("loginToken");

      await axios.post(
        `${API_URL}work/deleteimage`,
        { workId, publicId },
        { headers: { token: `${Token}` } }
      );

      alert("Image deleted successfully");
      getalldata();
    } catch (error) {
      console.error(error);
      alert("Failed to delete image");
    } finally {
      setIsDeletingImage(false);
    }
  };

  useEffect(() => {
    getalldata();
  }, [getalldata]);

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("imageUrl");
    if (storedProfilePicture) {
      setAvatar(storedProfilePicture);
    }
  }, []);

  return (
    <div className="p-6 lg:mt-20 bg-gray-50 min-h-screen">
      {isAddingImages && <LoadingSpinner />}
      {isDeletingWork && <LoadingSpinner />}
      {isDeletingImage && <LoadingSpinner />}

      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        My Added Work Details
      </h1>

      {userdata && userdata.user && userdata.user.addwork && userdata.user.addwork.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userdata.user.addwork.map((work, index) => (
            <div key={index} className="bg-white p-6 border-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={avatar}
                  alt="User profile"
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-700">{work.role}</h2>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-gray-700">
                <p><strong>Experience:</strong> {work.experience} years</p>
                {work.standard && <p><strong>Standard:</strong> {work.standard}</p>}
                {work.subject && <p><strong>Subject:</strong> {work.subject}</p>}
                {work.vehicletype && <p><strong>Vehicle Type:</strong> {work.vehicletype}</p>}
                {work.paintertype && <p><strong>Painter Type:</strong> {work.paintertype}</p>}
                {work.cartype && <p><strong>Car Type:</strong> {work.cartype}</p>}
                {work.biketype && <p><strong>Bike Type:</strong> {work.biketype}</p>}
                {work.autotype && <p><strong>Auto Type:</strong> {work.autotype}</p>}
                {work.shoottype && <p><strong>Shoot Type:</strong> {work.shoottype}</p>}
                {work.marbultype && <p><strong>Marble Type:</strong> {work.marbultype}</p>}
                {work.weldingtype && <p><strong>Welding Type:</strong> {work.weldingtype}</p>}
              </div>

              <div className="mb-4">
                <div className="flex space-x-3 overflow-x-auto">
                  {work.photos.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative min-w-[80px]">
                      <img
                        src={image}
                        alt={`work-${imgIndex}`}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedImage(image)}
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

              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full p-2 border-2 rounded-md text-gray-700"
                />
              </div>

              <div className="space-y-3">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 disabled:opacity-50"
                  onClick={() => handleAddImages(work._id)}
                  disabled={isAddingImages}
                >
                  {isAddingImages ? "Adding..." : "Add Images"}
                </button>

                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg w-full hover:bg-red-700 disabled:opacity-50"
                  onClick={() => handleDeleteWork(work._id)}
                  disabled={isDeletingWork}
                >
                  {isDeletingWork ? "Deleting..." : "Delete Work"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-8">No works have been added yet.</p>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <img
              src={selectedImage}
              alt="Selected work"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Totalworks;
