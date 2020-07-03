import React, { useState } from 'react';
import Node from './Node';
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid } from '../helpers/gridHelpers';
import { dijkstra, visualizeDijkstra } from '../helpers/dijkstraHelpers';
import '../styles/Grid.css';

export default function Grid() {
  const grid = setInitialGrid();

  visualizeDijkstra(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)

  return (
    <div className="Grid">
      {grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const { row, col, isStart, isFinish, isVisited, isWall } = node;
          return (
            <Node
              key={nodeIndex}
              row = {row}
              col = {col}
              isStart={isStart}
              isFinish={isFinish}
              isVisited={isVisited}
              isWall={isWall}
            />
          )
        })
      })}
    </div>
  )
}