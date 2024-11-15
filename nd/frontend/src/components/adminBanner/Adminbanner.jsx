import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [bannerText, setBannerText] = useState('');
    const [bannerImage, setBannerImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bannerText', bannerText);
        if (bannerImage) {
            formData.append('bannerImage', bannerImage);
        }

        await axios.post('/api/banner', formData);
        alert('Banner updated successfully');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="block text-gray-700">Banner Text</label>
                <input
                    type="text"
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Banner Image</label>
                <input
                    type="file"
                    onChange={(e) => setBannerImage(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Banner
            </button>
        </form>
    );
};

export default AdminPanel;
