import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { contactsRoute, host } from '../utilities/api-routes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatBox from '../components/ChatBox';
import { io } from 'socket.io-client';

function Chat() {
const [contacts, setContacts] = useState([]);
const [currentUser, setCurrentUser] = useState(undefined);
const [currentChat, setCurrentChat] = useState(undefined);
const navigate = useNavigate();
const socket = useRef();

useEffect(() => {
  const confirmUser = async () => {
    if (!localStorage.getItem('Logged-in')) {
      navigate('/login');
    } else {
      const mainUser = await JSON.parse(localStorage.getItem('Username'));
      setCurrentUser(mainUser);
    }
  }
  confirmUser();
}, []);

useEffect(() => {
  socket.current = io(host);
  const userId = JSON.parse(localStorage.getItem('ID'));
  socket.current.emit('add-user', userId);
}, [currentUser]);

useEffect(() => {
  const fetchContacts = async () => {
    if (currentUser) {
      if (localStorage.getItem('Check-avatar') === 'false') {
        console.log(localStorage.getItem('Check-avatar'));
        alert('You have to set an avatar image first!')
        navigate('/avatar');
      } else {
        const id = JSON.parse(localStorage.getItem('ID'));
        const data = await axios.get(`${contactsRoute}/${id}`);
        setContacts(data.data);
      }
    }
  }
  fetchContacts();
}, [currentUser]);

const handleChatChange = (chat) => {
  setCurrentChat(chat);
}

  return (
    <div>
      <Navbar />
      <Container>
      <h1>Chat Page</h1>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeCurrentChat={handleChatChange} />
          {currentChat === undefined
            ? <Welcome />
            : <ChatBox currentChat={currentChat} socket={socket}/>
          }
          
        </div>
      </Container>
      
    </div>
  )
}

const Container = styled.div`
  height: 91vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h1 {
    color: #fff;
  }
  .container {
    height: 80vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
