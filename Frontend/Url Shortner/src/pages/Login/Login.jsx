import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';


function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: 'top-right',
        });
    };

    const handleError = (msg) => {
        toast.error(msg, {
            position: 'top-right',
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = `http://localhost:5000/api/user/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();

            if (response.ok) {
                const { token, name } = result;
                handleSuccess('Login successful');
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', name);

                setTimeout(() => {
                    navigate('/');
                }, 1000); 
            } else {
                handleError(result.message || 'Invalid email or password');
            }
        } catch (err) {
            handleError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{width:'100vw'  , height:'100vh' , display:'flex' , justifyContent:'center' , alignItems:'center', overflow:'hidden' }}>

      
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>
                    Don't have an account? <Link to='/signup'>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        </div>
    );
}

export default Login;
