import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';

const BoardDetails = ({ closeForm }) => {

  const handleSubmit = () => {

  }
  const handleChange = () => {

  }

  const handleClose = (e) => {
    e.preventDefault();
    closeForm();
  }

  return (
    <>
      <FormContainer>
        <div className="dark-bg" onClick={e => handleClose(e)} />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
              <img src={Logo} alt="placeholder" />
              <h1>Retro-Spec</h1>
            </div>
            <input type="text" placeholder='Board Name' name='name' onChange={e => handleChange(e)} required/>
            <input type="text" placeholder='Votes per user' name='votes' onChange={e => handleChange(e)} required/>
            <div className="btns">
              <button type='submit' className="create">Create Board</button>
              <button type='button' className="close" onClick={e => handleClose(e)}>Close</button>
            </div>
          </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
.dark-bg {
  background-color: #181A18;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  filter:opacity(0.5);
  filter:blur(100rem);
}

}
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: blur;
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
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
.create {
  background-color: #32de84;
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
    background-color: #ACE1AF;
  }
}
.close {
  background-color: crimson;
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
    background-color: pink;
  }
}
.btns {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
`;

export default BoardDetails
