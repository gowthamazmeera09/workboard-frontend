import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../data/data';


function Images() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get(`${API_URL}image/upload`);
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await axios.post(`${API_URL}image/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchImages(); // Refresh images after upload
        } catch (err) {
            console.error(err);
        }
    };
  return (
    <div>
            <h2>Image Upload</h2>
            <form onSubmit={onFileUpload}>
                <input type="file" onChange={onFileChange} />
                <button type="submit">Upload</button>
            </form>
            <div>
                <h3>Uploaded Images:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image) => (
                        <div key={image._id} style={{ margin: '10px' }}>
                            <img
                                src={`${API_URL}${image.imageUrl}`}
                                alt="uploaded"
                                style={{ width: '150px', height: '150px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Images;