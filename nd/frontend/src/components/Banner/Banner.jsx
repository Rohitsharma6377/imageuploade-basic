import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
    const [banner, setBanner] = useState({ bannerText: '', bannerImage: '' });

    useEffect(() => {
        axios.get('/api/banner').then(response => {
            setBanner(response.data);
        });
    }, []);

    return (
        <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: `url(${banner.bannerImage})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex items-center justify-center h-full text-white text-4xl font-bold">
                {banner.bannerText}
            </div>
        </div>
    );
};

export default Banner;
