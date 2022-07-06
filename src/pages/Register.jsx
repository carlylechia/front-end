import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utilities/api-routes';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate();

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values;
    if(password !== confirmPassword) {
      toast.error('Password confirmation failed!', toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error('Username must be at least 3 characters!', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters!', toastOptions);
      return false;
    } else if (email.length < 5) {
      toast.error('Valid email is required for registration!', toastOptions);
      return false;
    }
    return true;
  }

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = values;
      const {data} = await axios.post(registerRoute, { name, email, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('Registered-User', 'Thank you for registering.');
        navigate('/login');
      }
    } else {
      console.log('damn it!');
    };
  }
    // Stops people from registering more than once on a single device
  // useEffect(() => {
  //   if (localStorage.getItem('Registered-User')) {
  //     navigate('/login')
  //   }
  // }, [])

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="placeholder" />
            <h1>Retro-Spec</h1>
          </div>
          <input type="text" placeholder='Username' name='name' onChange={e => handleChange(e)} required/>
          <input type="email" placeholder='Email' name='email' onChange={e => handleChange(e)} required/>
          <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)} required/>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={e => handleChange(e)} required/>
          <button type='submit'>Create Account</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #997af0;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;

export default Register
