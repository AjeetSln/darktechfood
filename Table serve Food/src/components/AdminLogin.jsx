import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/admin', { email, password });
            console.log('Login Response:', result.data); 
            
            if (result.data === 'Success') {
                localStorage.setItem('authToken', 'loggedIn'); // Set auth flag in localStorage
                navigate('/pendingOrder');
            } else {
                setError(result.data.message || 'Enter Correct Details'); 
            }
        } catch (error) {
            setError('Server error');
        }
    };

    return (
        <div className="wrapper">
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <h1>Admin Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
