import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

export default function AnalyticsForm() {
    const [shortUrl, setShortUrl] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setShortUrl(e.target.value);
    };

    const isUserLoggedIn = () => {
        return localStorage.getItem('token'); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (shortUrl) {
            if (isUserLoggedIn()) {
                let parts = shortUrl.split("/");  
                let val = parts[parts.length - 1];  
                navigate(`/analytics/${val}`); 
            } else {
                toast.error('Please login to view the analytics.');

                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            }
        }
    };

    return (
        <div style={{ background: '#F5F4F2' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={shortUrl}
                    onChange={handleInputChange}
                    placeholder="Enter your short URL"
                    required
                    style={{ border: 'none', background: '#F5F4F2', maxWidth: '30%', marginBottom: '30px' }}
                />
                <button type="submit">Go to Analytics</button>
            </form>
            <ToastContainer />
        </div>
    );
}
