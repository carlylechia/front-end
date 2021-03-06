import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../assets/loader.gif';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { avatarRoute } from '../utilities/api-routes';
import Navbar from '../components/Navbar';
import { Buffer } from 'buffer';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/456789';
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || ('/chat');

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar! Reload the page for other options.', toastOptions)
    } else {
      const id = JSON.stringify(localStorage.getItem('ID')).split('\\"')[1];
      const { data } = await axios.post(`${avatarRoute}/${id}`, {
        avatarImage: avatars[selectedAvatar],
      });
      if (data.isSet) {
        JSON.stringify(localStorage.setItem('Check-avatar', true));
        localStorage.setItem('User-avatar', JSON.stringify(data.image));
        navigate(redirectPath, { replace: true });
      } else {
        toast.error('Failed to set avatar! Please try again.', toastOptions);
      }

    }
      
  };
  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i=0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data)
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchAvatars();

  }, []);

  useEffect(() => {
    if (!localStorage.getItem('Logged-in')) {
      navigate('/login');
    }
  }, [])

  return (
    <>
      <Navbar />
      {
        isLoading
        ? <Container><img src={Loader} className='loader' alt='loader'/></Container>
        : 
        <Container>
          <div className='title-container'>
            <h1>Select an avatar for your profile...</h1>
          </div>
          <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
            <ToastContainer />
        </Container>
      }
    </>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`;

export default SetAvatar;