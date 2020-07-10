import React, { useState } from 'react';

export default function useMaze() {
  const [state, setState] = useState({
    walls: [],
  })

  const generateMazeWalls = (grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) => {
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
        generateMazeWalls(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
      } else {
        generateMazeWalls(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls);
      }
    
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        generateMazeWalls(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
      } else {
        generateMazeWalls(grid, currentRow + 2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls);
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
        generateMazeWalls(grid, rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', surroundingWalls);
      } else {
        generateMazeWalls(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
      }
    
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        generateMazeWalls(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', surroundingWalls);
      } else {
        generateMazeWalls(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
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

  const generateMaze = (grid, mazeWalls) => {
    const maze = grid.map(row => {
      return row.map(node => {
        const newNode = {
          ...node,
          isWall: false, // ensures grid is refreshed is generateMaze is called multiple times
          isWeight: false
        }

        if (mazeWalls.includes(node)) newNode.isWall = true;

        return newNode
      })
    })

    for (let row = 1; row <= maze.length - 2; row++) { // guarantee four spaces in each row
      const spaces = [Math.ceil(Math.random() * 11), Math.ceil(11 + (Math.random() * 11)), Math.ceil(22 + (Math.random() * 11)), Math.ceil(33 + (Math.random() * 10))];
      // const spaces = [Math.ceil(Math.random() * 14), Math.ceil(14 + (Math.random() * 14)), Math.ceil(28 + (Math.random() * 15))];
  
      for (const space of spaces) {
        maze[row][space].isWall = false;
      }
    }

    for (let col = 1; col <= maze[0].length - 2; col++) { // guarantee two spaces in each column
      const spaces = [Math.ceil(Math.random() * 7), Math.ceil(7 + (Math.random() * 6))];

      for (const row of maze) {
        for (const space of spaces) {
          if (maze.indexOf(row) === space) {
            maze[space][col].isWall = false;
          }
        }
      }
    }

    return maze;
  }

  return { mazeWalls: state.walls, generateMazeWalls, generateMaze }
}
