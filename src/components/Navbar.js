import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/user-context';
import { BiPowerOff } from "react-icons/bi";
import styled from 'styled-components';

function Navbar() {

  const linkStyles = ({isActive}) => {
    return {
      textAlign: 'center',
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: 'none',
      marginLeft: '1rem',
    }
  }

  const auth = useAuth();
  const loggedIn = JSON.parse(localStorage.getItem('Logged-in'));
  const username = JSON.parse(localStorage.getItem('Username'));
  const avatar = JSON.parse(localStorage.getItem('User-avatar'));
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <nav>
      {
      loggedIn
      ? (<>
        <div className='user'>
        <div className="avatar">
          <img
            width='50rem'
            src={`data:image/svg+xml;base64,${avatar}`}
            alt="avatar"
          />
        </div>
        <h3>{username}</h3>
      </div>
      <NavLink style={linkStyles} to='/'>Home</NavLink>
      <NavLink style={linkStyles} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={linkStyles} to='/chat'>Chat</NavLink>
      <NavLink style={linkStyles} to='/avatar'>Avatar</NavLink>
      <Button className='tooltip' onClick={handleLogout}><BiPowerOff /> <span className='tooltip-text'>Log-Out</span> </Button>
      </>)
      :  (<>
        <NavLink style={linkStyles} to='/'>Home</NavLink>
        <NavLink style={linkStyles} to='/login'>Login</NavLink>
        <NavLink style={linkStyles} to='/register'>Register</NavLink>
      </>)
      }
    </nav>
  )
}

const Button = styled.button`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
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
  top: 5vh;
  right: 3vw;
  z-index: 1;
}

:hover .tooltip-text {
  visibility: visible;
}
:active {
  background-color: black;
}
`;

export default Navbar