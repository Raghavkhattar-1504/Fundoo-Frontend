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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSignup = (e) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPasswordCheck("");
        if (!firstName) {
            alert("Please enter your first name");
        }
        if (!lastName) {
            alert("Please enter your last name");
        }
        if (!email) {
            alert("Please enter your userame");
        }
        if (!password) {
            alert("Please enter your password");
        }
        if (!passwordCheck) {
            alert("Please confirm your password");
        }
        if (!emailValidator.test(email)) {
            setEmailError("Please Enter a valid email");
        }
        if (!passwordValidator.test(password)) {
            setPasswordError("Please Enter a valid email");
        }
        if (!(password === passwordCheck)) {
            setPasswordCheckError("Password does not match");
        }

        const payload = {
            firstName,
            lastName,
            email,
            password,
            service: "advance"
        }

        signUpApiCall(payload)
            .then(() => {
                navigate('/');
            })
            .catch(err=>{
            console.log(err)
            })

    }
    return (
        <div className='signup-body-container'>
            <div className='signup-box-container'>
                <div className='container-left-content'>
                    <h2 className='fundoo-text'>Fundoo</h2>
                    <h2 className='signup-create-account-text'>Create your Fundoo Account</h2>
                    <div className='input-container'>
                        <div className='name-container'>
                            <TextField className='outlined-basic-name' label="First Name*" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <TextField className='outlined-basic-name' label="Last Name*" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className='username-container'>
                            <TextField className='outlined-basic' label="Username*" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <h6 className='username-conditions-text'>Username should be in email format.</h6>
                        </div>
                        <div className='password-container'>
                            <div className='password-container-textfield'>
                                <TextField className='outlined-basic-password' label="Password*" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <TextField className='outlined-basic-password' label="Confirm*" variant="outlined" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                            </div>
                            <h6 className='password-conditions-text'>Use 8 or more characters with a mix of letters, numbers and symbols.</h6>
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
    )
}

export default Signup
