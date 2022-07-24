// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getBoardDataRoute } from '../utilities/api-routes';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getBoardData, getColumns } from "../utilities/api-routes";

const Board = ({ chosenBoard }) => {
  const {id} = useParams();
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const boardId = localStorage.getItem('boardId');

  useEffect(() => {
    getBoardData(id).then(setBoard);
    getColumns(boardId).then(setColumns);
    console.log(columns);
  }, [id]);

  return (
    <>
      <div>{chosenBoard?.name} {board.name}</div>
      {columns.map((column) => {
        return (
          <div key={column._id}>{column.name}</div>
        )
      })}
    </>
  )
}

export default Board
