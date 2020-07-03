import React, { useState } from 'react';
import '../styles/Node.css';
import makeWall from '../helpers/wallHelpers';
const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isVisited, isWall, onClick, toWall, mouseDown } = props;

  function clicked () {
    console.log(this)
  }

  const classes = classNames("Node", {
    'node-start': isStart,
    'node-finish': isFinish,
    'node-wall': isWall
  });

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
      mouseDown={() => mouseDown(row,col)}
    >
    </div>
  )
}