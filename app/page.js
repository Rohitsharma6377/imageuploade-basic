"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      setUploadedFile(response.data.url);
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <button onClick={handleUpload}>Upload</button>
      {uploadedFile && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedFile} alt="Uploaded File" width="200" />
        </div>
      )}
    </div>
  );
};

export default Upload;