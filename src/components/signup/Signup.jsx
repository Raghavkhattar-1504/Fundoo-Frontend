import React, { useState } from 'react'
import './Signup.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Googleone from '../../assets/googleone.png'
import { Link, useNavigate } from 'react-router-dom';
import { signUpApiCall } from '../../utils/api';

const Signup = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSignup = () => {
        let isValid = true;

        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordCheckError('');

        if (!firstName) {
            setFirstNameError("First name is required");
            isValid = false;
        }
        if (!lastName) {
            setLastNameError("Last name is required");
            isValid = false;
        }
        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!emailValidator.test(email)) {
            setEmailError("Enter a valid email address");
            isValid = false;
        }
        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (!passwordValidator.test(password)) {
            setPasswordError("Password must have at least 8 characters, including uppercase, lowercase, number, and special character");
            isValid = false;
        }
        if (!passwordCheck) {
            setPasswordCheckError("Please confirm your password");
            isValid = false;
        } else if (password !== passwordCheck) {
            setPasswordCheckError("Passwords do not match");
            isValid = false;
        }

        if (!isValid) return;

        const payload = {
            firstName,
            lastName,
            email,
            password,
            service: "advance"
        };

        signUpApiCall(payload)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    return (
        <div className='signup-body-container'>
            <div className='signup-box-container'>
                <div className='container-left-content'>
                    <h2 className='fundoo-text'>Fundoo</h2>
                    <h2 className='signup-create-account-text'>Create your Fundoo Account</h2>
                    <div className='input-container'>
                        <div className='name-container'>
                            <TextField
                                className='outlined-basic-name'
                                label="First Name*"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!!firstNameError}
                                helperText={firstNameError}
                            />
                            <TextField
                                className='outlined-basic-name'
                                label="Last Name*"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={!!lastNameError}
                                helperText={lastNameError}
                            />
                        </div>
                        <div className='username-container'>
                            <TextField
                                className='outlined-basic'
                                label="Username*"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError || "Username should be in email format."}
                            />
                        </div>
                        <div className='password-container'>
                            <div className='password-container-textfield'>
                                <TextField
                                    className='outlined-basic-password'
                                    label="Password*"
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!passwordError}
                                    helperText={passwordError || "Use 8+ characters with letters, numbers, and symbols."}
                                />
                                <TextField
                                    className='outlined-basic-password'
                                    label="Confirm*"
                                    variant="outlined"
                                    type="password"
                                    value={passwordCheck}
                                    onChange={(e) => setPasswordCheck(e.target.value)}
                                    error={!!passwordCheckError}
                                    helperText={passwordCheckError}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='signup-button-container'>
                        <Link to={'/'}>
                            <Button variant="text">Sign In instead</Button>
                        </Link>
                        <Button variant="contained" onClick={handleSignup}>Register</Button>
                    </div>
                </div>
                <div className='container-right-content'>
                    <img src={Googleone} alt="Google One" />
                    <p className='container-right-content-text'>One Account. All of Fundoo <br />working for you.</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
