import React, { useState, useEffect } from 'react';
import { getBoardsRoute, searchBoardsRoute } from '../utilities/api-routes';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';
import BoardDetails from '../components/BoardDetails';
import Loader from '../assets/loader.gif';
import Robot from "../assets/robot.gif";
import Board from './Board';
import { NavLink } from 'react-router-dom';
import { httpClient } from '../utilities/httpClient';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [boards, setBoards] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [chosenBoard, setChosenBoard] = useState(undefined);

  const creatorId = JSON.parse(localStorage.getItem('ID'));
  const username = JSON.stringify(localStorage.getItem('Username')).split('\\"')[1];

  const inputBoardData = () => {
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
  }

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await httpClient.post(getBoardsRoute, {
        creator: creatorId,
      })
      setBoards(response.data);
      setIsLoading(false);
    };
    fetchBoards();
  }, []);

  const handleChange = async e => {
    setSearchField(e.target.value);
    setBoards(filteredBoards)
    };

  const filteredBoards = boards.filter(
    board => {
      return (
        board
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleSearch = async e => {
    e.preventDefault();
    const response = await axios.post(searchBoardsRoute, {
      name: searchField,
      creator: creatorId
    })
    setBoards(response.data);
    setIsLoading(false);
  }

  const handleBoardClick = (board) => {
    setChosenBoard(board);
    localStorage.setItem("boardId", board._id);
  }

  return (
    <>
      <Navbar />
      {
        isLoading
        ? <Container className='load-center'><img src={Loader} className='loader' alt='loader'/></Container>
        : chosenBoard === undefined
        ?
        <Container>
        <div className='top'>
          <h2>Dashboard <span>{boards.length} {boards.length < 2 ? "Board" : "Boards"}</span></h2>
          <form onSubmit={e => {
            handleSearch(e)
            }}>
            <input type="search" placeholder='Search boards' name='search' onChange={handleChange}/>
          </form>
        </div>
        <div className='display'>
        <Button className='tooltip' onClick={inputBoardData}>
          <FaPlusCircle />
          <span className='tooltip-text'>Add a new board</span>
        </Button>
        {
          showForm
          ? <BoardDetails closeForm={ closeForm }/>
          : boards.length > 0
          ? boards.map((board) => {
            return (
              <NavLink key={board.id} to={`/board/${board.id}`}>
                <div className="board" onClick={() => handleBoardClick(board)} >
                  <h4>{board.name}</h4>
                </div>
              </NavLink>
            )
          })
          : (
            <div className='no-board'>
              <img src={Robot} alt="" />
              <h1>You have no board yet, <span>{username}</span>...</h1>
              <h3>Click the highlighted + sign above to create your first board!</h3>
            </div>
          )
        }
        </div>
      </Container>
      : <Board chosenBoard={chosenBoard} />
    }
    </>
  )
}
const Container = styled.div `
background-color: #131324;
min-height: calc(100vh - 4.4rem);
.load-center {
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.loader {
  max-inline-size: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.top {
  background-color: #00000076;
  padding: 3rem;
  display: flex;
  justify-content: space-between;

  form input {
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 10px;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
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
  }

  h2 {
    padding: 1rem 0.5rem;
    color: #fff
  }

  h2 span {
    color: #00000076;
    font-size: 19px;
    background: silver;
    padding: 5px;
    width: fit-content;
    z-index: -10;
    border-radius: 5rem;
  }
}

.display {
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: center;
}

.no-board {
  color: #fff;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  img {
    margin: -5rem 1rem -5rem -10rem
  }
  h1 {
    margin: 0 0 2rem -10rem;
  }
  h1 span {
    color: #4e0eff;
  }
  h3 {
    margin-left: -13rem;
  }
}

.board {
  min-width: 12.5rem;
  min-height: 8.5rem;
  border: 1px solid silver;
  border-radius: 5px;
  background-color: #181A18;
  margin: 1rem 1.5rem 1rem 1.7rem;
  &:hover {
    border: 2px solid green;
    background: black;
  }
  h4 {
    color: aliceblue;
    text-align: center;
  }
}

`

const Button = styled.div `
margin: 1rem 2rem;
padding: 3rem 5rem;
border: 1px dashed aliceblue;
border-radius: 5px;
width: fit-content;
height: fit-content;
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
