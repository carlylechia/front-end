import Navbar from '../components/Navbar';
import { FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
      <div className='top'>
        <h2>Dashboard</h2>
        <form>
          <input type="search" placeholder='Search boards' name='search' />
        </form>
      </div>
      <Button className='tooltip'>
        <FaPlusCircle />
        <span className='tooltip-text'>Add a new board</span>
      </Button>
    </Container>
  )
}
const Container = styled.div `
background-color: #131324;
min-height: 100vh;
.top {
  background-color: #00000076;
  padding: 3rem;
  display: flex;
  justify-content: space-between;

  form input {
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 10px;
    padding: 0.5rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  form input::placeholder {
    padding: 25px 5px 0 25px;
    // text-align: center;
  }
  h2 {
    padding: 1rem 0.5rem;
    color: #fff
  }
}

`

const Button = styled.div `
margin: 1rem 2rem;
padding: 3rem 5rem;
border: 1px dashed aliceblue;
border-radius: 5px;
width: fit-content;
:hover {
  border: 2px dotted blue;
}
:active {
    border: 3px solid green;
}
svg {
  font-size: 2rem;
  color: #ebe7ff;
}
svg:hover {
  color: blue;
}
svg:active {
  color: green;
}
.tooltip {
  position: relative;
}

span {
  visibility: hidden;
  background-color: #131324;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
 
  position: absolute;
  top: 21rem;
  left: 4rem;
  z-index: 1;
}

:hover .tooltip-text {
  visibility: visible;
}
:active {
  background-color: black;
`

export default Dashboard;
