"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadSuccess(true);
      setUploadError(null);
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      setUploadSuccess(false);
      setUploadError(error.message);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Image Upload</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      {previewImage && (
        <div className="flex flex-col items-center justify-center mt-4">
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full h-auto rounded-md shadow-md"
          />
          <button
            onClick={handleUpload}
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Upload
          </button>
          {uploadSuccess && (
            <p className="text-green-500 font-bold mt-2">File uploaded successfully!</p>
          )}
          {uploadError && (
            <p className="text-red-500 font-bold mt-2">{uploadError}</p>
          )}
        </div>
      )}
    </div>
  );
}