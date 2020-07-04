import React, { useState } from 'react';
import Node from './Node';
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid } from '../helpers/gridHelpers';
import visualizeDijkstra from '../helpers/dijkstraHelpers';
import '../styles/Grid.css';

export default function Grid() {
  const [state, setState] = useState({
    grid: setInitialGrid(),
    mousePressed: false,
    inProgress: false,
    isStartPickup: false,
  })

  const mouseDown = (row, col) => {
    setState(prev => ({ ...prev, mousePressed: true }));
  }

  const mouseUp = (row, col) => {
    setState(prev => ({ ...prev, mousePressed: false }))
  }

  function toggleWall(row, col, isWall, isStart, isFinish) {
    if (!isStart && !isFinish && !state.inProgress && !state.isStartPickup) {
      const newNode = {
        ...state.grid[row][col],
        isWall
      }
  
      const newRow = [...state.grid[row]];
      newRow[col] = newNode;
  
      const grid = [...state.grid];
      grid[row] = newRow;
  
      setState(prev => ({ ...prev, grid }));

    } else if (isStart && !state.isStartPickup) {

      console.log('clicked')
      setState(prev => ({ ...prev, isStartPickup: true }));

    } else if (state.isStartPickup) {
        
      console.log(row,col)
   
      const setNewGrid = () => {
        const grid = [];
        
        // for each row in the grid... 
        for (let rowArray = 0; rowArray < 15; rowArray++) {
          const currentRow = [];
      
          // for each column in the row...
          for (let colValue = 0; colValue < 50; colValue++) {
      
            // create node and push
            const newNode = {
              ...state.grid[rowArray][colValue],
              isStart: rowArray === row && colValue === col,
            }

            currentRow.push(newNode);
          }
        
          grid.push(currentRow);
        }
      
        return grid;
      }
    
        setState(prev => ({ ...prev, grid: setNewGrid() }));
        
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