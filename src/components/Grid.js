import React, { useState } from 'react';
import Node from './Node';
import '../styles/Grid.css';

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const initGrid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      const currentNode = {
        row,
        col,
        isStart: row === 7 && col === 5,
        isFinish: row === 7 && col === 45
      }

      currentRow.push(currentNode);
    }

    initGrid.push(currentRow)
  }

  const grid = initGrid.map((row, rowIndex) => {
    return row.map((node, nodeIndex) => {
      return (
        <Node
          key={nodeIndex}
          isStart={node.isStart}
          isFinish={node.isFinish}
        />
      )
    })
  })

  return (
    <div className="Grid">
      {grid}
    </div>
  )
}