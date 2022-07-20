import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { clearChatRoute, getAllMessagesRoute, sendMessageRoute } from '../utilities/api-routes';
import ChatInput from './ChatInput';
import {v4 as uuidv4} from 'uuid';
import { FaTrash } from 'react-icons/fa';

function ChatBox({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const senderId = JSON.parse(localStorage.getItem('ID'));
  const scrollRef = useRef();

  useEffect(() => {
    const fetchChatMessages = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: senderId,
        to: currentChat._id,
      })
      setMessages(response.data);
    };
    fetchChatMessages();
  }, [currentChat]);

const handleSendMsg = async (msg) => {
  await axios.post(sendMessageRoute, {
    from: senderId,
    to: currentChat._id,
    message: msg,
  })
  socket.current.emit('send-msg', {
    to: currentChat._id,
    from: senderId,
    message: msg,
  })
  const msgs = [...messages];
  msgs.push({fromSelf: true, message: msg});
  setMessages(msgs);
};

const handleClearChat = async () => {
  await axios.post(clearChatRoute, {
    from: senderId,
    to: currentChat._id,
  })
  socket.current.emit('chat-cleared', msg => {
    setMessages([]);
    setArrivalMessage({ fromSelf: true, message: msg });
  })
}

useEffect(() => {
  if (socket.current) {
    socket.current.on("recieve-msg", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });
  }
}, []);

useEffect(() => {
  arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage]);

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const closeEmojis = () => {
  console.log("yay!");
}

  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
          <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className='username'>
            <h3>{currentChat.name}</h3>
          </div>
        </div>
        <div onClick={handleClearChat} className='trash-icon tooltip'>
          <FaTrash />
          <span className='tooltip-text'>Clear Chat</span>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    position: relative;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .trash-icon {
      cursor: pointer;
      svg {
        color: white;
      }
      .tooltip {
        position: relative;
      }
      
      span {
        visibility: hidden;
        background-color: #fff;
        color: #131324;
        text-align: center;
        padding: 5px;
        border-radius: 6px;
        text-wrap: none;
        position: absolute;
        top: 4rem;
        right: 1vw;
        z-index: 1;
      }
      
      :hover .tooltip-text {
        visibility: visible;
      }
    }
    
  }
  // .bcg {
  //   background-color: #00000076;
  // }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatBox