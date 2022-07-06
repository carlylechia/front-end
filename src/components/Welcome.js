import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
const userName = JSON.stringify(localStorage.getItem('Username')).split('\\"')[1];
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome to the chat section, <span>{userName}!</span>
      </h1>
      <h3>Please select a contact to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
