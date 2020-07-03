import React, { useState } from 'react';
import Node from './Node';
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid } from '../helpers/gridHelpers';
import { dijkstra, visualizeDijkstra } from '../helpers/dijkstraHelpers';
import '../styles/Grid.css';

export default function Grid() {
  const grid = setInitialGrid();

  const [newGrid, setGrid] = useState({
    grid: grid,
    mousePressed: false
  });

  const mouseDown = (row, col) => {
    setGrid((prev) => ({ ...prev, mousePressed: true }));
    console.log(newGrid.mousePressed)
  }

  // visualizeDijkstra(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)
  function toWall(node) {
    node.isWall = !node.isWall;
    console.log('clicked a node')
  }

  return (
    <div className="Grid">
      {newGrid.grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const { row, col, isStart, isFinish, isVisited, isWall, onMouseDown } = node;
          return (
            <Node
              key={nodeIndex}
              row={row}
              col={col}
              isStart={isStart}
              isFinish={isFinish}
              isVisited={isVisited}
              isWall={isWall}
              onMouseDown={mouseDown}
            />
          )
        })
      })}
    </div>
  )
}