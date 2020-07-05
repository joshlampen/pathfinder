import React, { useState } from 'react';
import '../styles/Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isWall, mousePressed, toggleWall, isStartPickup, isEndPickup, isWeighted } = props;

  const checkGridPressed = () => {
    if (mousePressed) {
      toggleWall(row, col, !isWall, isStart, isFinish, isStartPickup, isEndPickup, isWeighted);
    }
  }

  const classes = classNames("Node", {
    'node-start': isStart,
    'node-finish': isFinish,
    'node-wall': isWall,
    'node-weight': isWeighted,
  });

  const mountStartIcon = () => {
    if (isStart) {
      return <FontAwesomeIcon icon={faLocationArrow} />
    }
  }

  const mountFinishIcon = () => {
    if (isFinish) {
      return <FontAwesomeIcon icon={faMapMarkerAlt} />
    }
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
      onMouseEnter={checkGridPressed}
      onMouseDown={() => toggleWall(row, col, !isWall, isStart, isFinish)}
    >
      {mountStartIcon()}
      {mountFinishIcon()}
    </div>
  )
}