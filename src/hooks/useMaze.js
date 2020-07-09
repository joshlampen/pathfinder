import React, { useState } from 'react';

export default function useMaze() {
  const [state, setState] = useState({
    walls: [],
  })

  const generateMaze = (grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) => {
    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }

    const startNode = getNodes(grid).startNode;
    const finishNode = getNodes(grid).finishNode;
    const interNode = getNodes(grid).interNode;

    if (!surroundingWalls) {
      generateSurroundingWalls(grid, startNode, finishNode, interNode);
  
      surroundingWalls = true;
    }
  
    if (orientation === 'horizontal') {
      const possibleRows = [];
      for (let i = rowStart; i <= rowEnd; i += 2) {
        possibleRows.push(i);
      }
  
      const possibleCols = [];
      for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
        possibleCols.push(i);
      }
  
      const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      const randomColIndex = Math.floor(Math.random() * possibleCols.length);
    
      const currentRow = possibleRows[randomRowIndex];
      const randomCol = possibleCols[randomColIndex];
      
      grid.forEach(row => {
        row.forEach(node => {
          if (!node.isStart && !node.isFinish && !node.isInter && node.row === currentRow && node.col !== randomCol && node.col >= colStart - 1 && node.col <= colEnd + 1) {
            setState(prev => ({ walls: [...prev.walls, node] }))
          }
        })
      })
      
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        generateMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
      } else {
        generateMaze(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls);
      }
    
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        generateMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
      } else {
        generateMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls);
      }
    } else {
      const possibleCols = [];
      for (let i = colStart; i <= colEnd; i += 2) {
        possibleCols.push(i);
      }
    
      const possibleRows = [];
      for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
        possibleRows.push(i);
      }
    
      const randomColIndex = Math.floor(Math.random() * possibleCols.length);
      const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    
      const currentCol = possibleCols[randomColIndex];
      const randomRow = possibleRows[randomRowIndex];
    
      grid.forEach(row => {
        row.forEach(node => {
          if (!node.isStart && !node.isFinish && !node.isInter && node.col === currentCol && node.row !== randomRow && node.row >= rowStart - 1 && node.row <= rowEnd + 1) {
            setState(prev => ({ walls: [...prev.walls, node] }))
          }
        })
      })
  
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        generateMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', surroundingWalls);
      } else {
        generateMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
      }
    
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        generateMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', surroundingWalls);
      } else {
        generateMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
      }
    }
  }

  const getNodes = grid => {
    let startNode;
    let finishNode;
    let interNode;
  
    for (const row of grid) {
      for (const node of row) {
        if (node.isStart) {
          startNode = node;
        } else if (node.isFinish) {
          finishNode = node;
        } else if (node.isInter) {
          interNode = node;
        }
      }
    }
  
    return { startNode, finishNode, interNode }
  }
  
  const generateSurroundingWalls = (grid, startNode, finishNode, interNode) => {
    const relevantNodes = [startNode, finishNode, interNode];

    grid.forEach(row => {
      row.forEach(node => {
        if (!relevantNodes.includes(node) && (node.row === 0 || node.col === 0 || node.row === grid.length - 1 || node.col === grid[0].length - 1)) {
          setState(prev => ({ walls: [...prev.walls, node] }))
        }
      })
    })
  }

  return { mazeWalls: state.walls, generateMaze }
}
