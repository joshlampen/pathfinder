import React, { useState } from 'react';
import '../styles/Node.css';

import { fontAwesomeIcon } from '@fortawesome/react-fontawesome';

const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isWall, mousePressed, toggleWall } = props;

  const checkGridPressed = () => {
    if (mousePressed) {
      toggleWall(row, col, !isWall, isStart, isFinish);
    }
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
      onMouseEnter={checkGridPressed}
      onClick={() => toggleWall(row, col, !isWall, isStart, isFinish)}
    >
    </div>
  )
}