import React, { useState } from 'react';
import '../styles/Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isWall, mousePressed, toggleWall, togglePickup, isStartPickup, isFinishPickup, moveNode } = props;

  const handleMouseEnter = () => {
    if (mousePressed && (isStartPickup || isFinishPickup)) {
      moveNode(row, col, isStartPickup, isFinishPickup);
    } else if (mousePressed && !isStart && !isFinish) {
      toggleWall(row, col, !isWall);
    }
  }

  const handleMouseDown = () => {
    if (isStart || isFinish) {
      togglePickup(row, col, isStart, isFinish);
    } else {
      toggleWall(row, col, !isWall);
    }
  }

  const classes = classNames("Node", {
    'node-start': isStart,
    'node-finish': isFinish,
    'node-wall': isWall
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
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
    >
      {mountStartIcon()}
      {mountFinishIcon()}
    </div>
  )
}