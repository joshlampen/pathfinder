import React, { useState } from 'react';
import '../styles/Node.css';
const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isVisited } = props;

  const classes = classNames("Node", {
    'node-start': isStart,
    'node-finish': isFinish,
  });

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
    >
    </div>
  )
}