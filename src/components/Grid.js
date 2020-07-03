import React, { useState } from 'react';
import Node from './Node';
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid } from '../helpers/gridHelpers';
import visualizeDijkstra from '../helpers/dijkstraHelpers';
import '../styles/Grid.css';

export default function Grid() {
  const [state, setState] = useState({
    grid: setInitialGrid(),
    mousePressed: false,
    inProgress: false
  })

  const mouseDown = (row, col) => {
    setState(prev => ({ ...prev, mousePressed: true }));
  }

  const mouseUp = (row, col) => {
    setState(prev => ({ ...prev, mousePressed: false }))
  }

  function toggleWall(row, col, isWall, isStart, isFinish) {
    if (!isStart && !isFinish && !state.inProgress) {
      const newNode = {
        ...state.grid[row][col],
        isWall
      }
  
      const newRow = [...state.grid[row]];
      newRow[col] = newNode;
  
      const grid = [...state.grid];
      grid[row] = newRow;
  
      setState(prev => ({ ...prev, grid }));
    } else {
      return;
    }
  }

  return (
    <div 
      className="Grid"
      onMouseDown = {() => mouseDown()}
      onMouseUp = {() => mouseUp()}
    >
      {state.grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const { row, col, isStart, isFinish, isVisited, isWall, mousePressed } = node;
          return (
            <Node
              key={nodeIndex}
              row={row}
              col={col}
              isStart={isStart}
              isFinish={isFinish}
              isVisited={isVisited}
              isWall={isWall}
              mousePressed={state.mousePressed}
              toggleWall = {toggleWall}
            />
          )
        })
      })}
      <button
        onClick = {() => {
          setState(prev => ({ ...prev, inProgress: true }))
          visualizeDijkstra(state.grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)
        }}
      >
        Please Work!
      </button>      
    </div>
  )
}