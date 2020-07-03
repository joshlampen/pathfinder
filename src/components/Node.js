import React, { useState } from 'react';
import '../styles/Node.css';
const classNames = require('classnames');

export default function Node(props) {
  // const [visited, setVisited] = useState(false)

  const { row, col, isStart, isFinish, isVisited } = props;

  const classes = classNames("Node", {
    'node-start': isStart,
    'node-finish': isFinish,
    // 'node-visited': isVisited
    // 'node-visited': visited
  });

  // setTimeout(() => {
  //   setVisited(true)
  // }, 1000);

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
    >
    </div>
  )
}