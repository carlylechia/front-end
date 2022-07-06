import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation, } from 'react-router-dom';
import Logo from '../assets/logo.png';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute, } from '../utilities/api-routes';
import { useAuth } from '../hooks/user-context';

function Login() {
  const [values, setValues] = useState({
    name: '',
    password: '',
  })
  // const [user, setUser] = useState('')
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || ('/');

  const handleValidation = () => {
    const { name, password, } = values;
    if (name === '') {
      toast.error('Username or email is required!', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Password is required!', toastOptions);
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
      const { name, password } = values;
      const {data} = await axios.post(loginRoute, { name, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // const authAxios = axios.create({
        //   baseURL: host,
        //   headers: {
        //     Authorization: `Bearer ${data.token}`
        //   }
        // })
        // axios.interceptors.request.use(
        //   config => {
        //     config.headers.authorization = `Bearer ${data.token}`;
        //     return config;
        //   }
        // )
        
        auth.login({
          name: values.name,
          password: undefined,
          token: data.token,
          refreshToken: data.refreshToken,
        });
        console.log('Welcome,', values.name);
        localStorage.setItem('Logged-in', true);
        localStorage.setItem('Username', JSON.stringify(data.user.name));
        localStorage.setItem('ID', JSON.stringify(data.user._id));
        localStorage.setItem('Check-avatar', JSON.stringify(data.user.isAvatarImageSet));
        localStorage.setItem('User-avatar', JSON.stringify(data.user.avatarImage));
        navigate(redirectPath, { replace: true });
      }
    } else {
      console.log('Validation error!');
      navigate('/login');
    };
  }

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem('Logged-in')) {
      navigate(redirectPath, { replace: true })
    }
  }, [])

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="placeholder" />
            <h1>Retro-Spec</h1>
          </div>
          <input type="text" placeholder='Username or Email' name='name' min='3' onChange={e => handleChange(e)} />
          <input type="password" placeholder='Password' name='password' min='8' onChange={e => handleChange(e)} />
          <button type='submit'>Login</button>
          <span>Don't have an account yet? <Link to="/register">Register</Link> for free!</span>
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

export default Login;
