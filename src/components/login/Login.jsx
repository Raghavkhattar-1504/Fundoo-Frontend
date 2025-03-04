import React, { useState } from 'react';
import "./Login.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginApiCall } from '../../utils/api';
import Signup from '../signup/Signup';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleApiCall =  () => {
        setEmailError('');
        setPasswordError('');   
        if (!email) {
            setEmailError('Email is Required !')
        }
        if (!emailValidator.test(email)) {
            setEmailError('Email is not valid!');
        }
        if (!password) {
            setPasswordError('Password is Required !')
        }

        loginApiCall({ email, password })
            .then((res)=>{
                localStorage.setItem("token",res?.data?.id)
                navigate('/dashboard/notes');
                alert("Login Success!")
            })
            .catch((err)=>{
                console.log(err);
                alert("Invalid User!")
            })

        setEmail('')
        setPassword('')
    }
    return (
        <div className='login-body-container'>
            <div className='content-box'>
                <div className='login-box'>
                    <div className='login-header'>
                        <p className='fundoo-text'><bold>Fundoo</bold></p>
                        <p className='signin-text'><bold>Sign In</bold></p>
                        <p className='useaccount-text'>Use Your Fundoo Account</p>
                    </div>
                    <div className='login-details'>
                        <TextField className='outlined-basic' label="Email or Phone*" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <span> {emailError} </span>}
                        <TextField className='outlined-basic' type='password' label="Password*" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <div className=''><p className='forgot-password-text'>Forgot Password</p></div>
                    </div>

                    <div className='login-footer'>
                        <Link to={'/register'}> <Button variant="text">Create Account</Button></Link>
                        <Button variant="contained" onClick={handleApiCall} >Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
