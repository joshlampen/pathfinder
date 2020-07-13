import React from 'react';
import '../styles/Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';

const classNames = require('classnames');

export default function Node(props) {
  const { row, col, isStart, isFinish, isInter, isWall, mousePressed, toggleWall, togglePickup, isStartPickup, isFinishPickup, isInterPickup, moveNode, isWeight, lastRow, lastCol } = props;

  const handleMouseEnter = () => {
    if (mousePressed && (isStartPickup || isFinishPickup || isInterPickup)) {
      moveNode(row, col, isStartPickup, isFinishPickup, isInterPickup);
    } else if (mousePressed && !isStart && !isFinish && !isInter) {
      toggleWall(row, col, !isWall, !isWeight);
    }
  }

  const handleMouseDown = () => {
    if (isStart || isFinish || isInter) {
      togglePickup(row, col, isStart, isFinish, isInter);
    } else {
      toggleWall(row, col, !isWall, !isWeight);
    }
  }

  const classes = classNames('Node', {
    'node-start': isStart,
    'node-finish': isFinish,
    'node-inter': isInter,
    'node-wall': isWall,
    'node-last-row': lastRow,
    'node-last-col': lastCol,
  });

  const mountIcon = () => {
    if (isStart && isInter && isFinish) {
      return (
        <div className='icon'>
          <FontAwesomeIcon icon={faLocationArrow} />
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <FontAwesomeIcon icon={faBullseye} />
        </div>
      )
    } else if (isStart && isFinish) {
      return (
        <div className='icon'>
          <FontAwesomeIcon icon={faLocationArrow} />
          <FontAwesomeIcon icon={faBullseye} />
        </div>
      )
    } else if (isStart && isInter) {
      return (
        <div className='icon'>
          <FontAwesomeIcon icon={faLocationArrow} />
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </div>
      )
    } else if (isInter && isFinish) {
      return (
        <div className='icon'>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <FontAwesomeIcon icon={faBullseye} />
        </div>
      )
    }
    if (isStart) return <div className='icon'><FontAwesomeIcon icon={faLocationArrow} /></div>
    if (isFinish) return <div className='icon'><FontAwesomeIcon icon={faBullseye} /></div>
    if (isInter) return <div className='icon'><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
    if (isWeight) return <div className='node-weight'><FontAwesomeIcon icon={faWeightHanging} /></div>
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
    >
      {mountIcon()}
    </div>
  )
}