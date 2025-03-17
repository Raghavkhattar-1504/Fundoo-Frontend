import React, { useState } from 'react';
import "./Login.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginApiCall } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleApiCall = () => {
        let isValid = true;

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required!');
            isValid = false;
        } else if (!emailValidator.test(email)) {
            setEmailError('Email is not valid!');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required!');
            isValid = false;
        }

        if (!isValid) return;

        loginApiCall({ email, password })
            .then((res) => {
                localStorage.setItem("token", res?.data?.id);
                navigate('/dashboard/notes');
            })
            .catch((err) => {
                console.log("Login failed:", err);
                throw err;
            });

        setEmail('');
        setPassword('');
    };

    return (
        <div className='login-body-container'>
            <div className='content-box'>
                <div className='login-box'>
                    <div className='login-header'>
                        <p className='fundoo-text'><b>Fundoo</b></p>
                        <p className='signin-text'><b>Sign In</b></p>
                        <p className='useaccount-text'>Use Your Fundoo Account</p>
                    </div>
                    <div className='login-details'>
                        <TextField
                            className='outlined-basic'
                            label="Email or Phone*"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            className='outlined-basic'
                            type='password'
                            label="Password*"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <div className=''>
                            <p className='forgot-password-text'>Forgot Password?</p>
                        </div>
                    </div>
                    <div className='login-footer'>
                        <Link to={'/register'}>
                            <Button variant="text">Create Account</Button>
                        </Link>
                        <Button variant="contained" onClick={handleApiCall}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
