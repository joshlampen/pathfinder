import React, { useState, useEffect } from "react";
import dijkstra from "../algorithms/dijkstra";
import breadthFirst from "../algorithms/breadthFirst";
import depthFirst from "../algorithms/depthFirst";
import astar from "../algorithms/astar";
import visualizeAlgorithm from "../algorithms/algorithmAnimations"
import greedyBfs from "../algorithms/greedyBfs";

export default function useGridData() {
  const START_NODE_ROW = 7;
  const START_NODE_COL = 9;
  const FINISH_NODE_ROW = 7;
  const FINISH_NODE_COL = 35;
  const INTER_NODE_ROW = 7;
  const INTER_NODE_COL = 22;

  const [startNode, setStartNode] = useState({ row: START_NODE_ROW, col: START_NODE_COL });
  const [finishNode, setFinishNode] = useState({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });
  const [interNode, setInterNode] = useState(null);

  const setInitialGrid = () => {   
    const grid = [];
    
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
  
      for (let col = 0; col < 45; col++) {
        currentRow.push(createNode(row, col));
      }
      
      grid.push(currentRow);
    }
  
    return grid;
  }
  
  const createNode = (row, col) => {
    const node = {
      row,
      col,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      isInter: interNode && row === interNode.row && col === interNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isWeight: false,
      previousNode: null,
      lastRow: row === 14,
      lastCol: col === 44,
      distanceToStart: 0,
      heuristic: 0,
      cost: Infinity,
    };
    
    return node;
  }
  
  const [state, setState] = useState({
    grid: setInitialGrid(),
    mousePressed: false,
    inProgress: false,
    isStartPickup: false,
    isFinishPickup: false,
    isInterPickup: false,
    drawWall: true,
    algorithm: 'DIJKSTRA'
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: true }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, isStartPickup: false, isFinishPickup: false, isInterPickup: false, mousePressed: false }));
  };

  const togglePickup = (row, col, isStart, isFinish, isInter) => {
    // if a user clicks on the start node, activate the node
    if (isStart && !state.isStartPickup && !state.inProgress) {
      setState(prev => ({ ...prev, isStartPickup: true }));
      moveNode(row, col, isStart, isFinish, isInter);
    } else if (isFinish && !state.isFinishPickup && !state.inProgress) {
      setState(prev => ({ ...prev, isFinishPickup: true }));
      moveNode(row, col, isStart, isFinish, isInter);
    } else if (isInter && !state.isInterPickup && !state.inProgress) {
      setState(prev => ({ ...prev, isInterPickup: true }));
      moveNode(row, col, isStart, isFinish, isInter);
    }
  }

  const moveNode = (row, col, isStartPickup, isFinishPickup, isInterPickup) => {
    const newNode = { row, col };

    if (isStartPickup) {
      setStartNode(newNode);
    } else if (isFinishPickup) {
      setFinishNode(newNode);
    } else if (isInterPickup) {
      setInterNode(newNode);
    }
  }

  const toggleWall = (row, col, isWall, isWeight) => {
    //if the user clicks on an empty square, draw a wall
    if (!state.inProgress && state.drawWall) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
        isWeight: false
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState(prev => ({ ...prev, grid }));
    } else if (!state.inProgress && !state.drawWall) { // otherwise, draw a weight
      const newNode = {
        ...state.grid[row][col],
        isWeight,
        isWall: false
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState(prev => ({ ...prev, grid }));
    }
  }

  useEffect(() => {
    const oldGrid = [...state.grid];

    const grid = oldGrid.map((row, rowIndex) => {
      return row.map((node, colIndex) => {
        const newNode = {
          ...node,
          isStart: rowIndex === startNode.row && colIndex === startNode.col,
          isFinish: rowIndex === finishNode.row && colIndex === finishNode.col,
          isInter: interNode && rowIndex === interNode.row && colIndex === interNode.col
        };

        if (newNode.isStart || newNode.isFinish || newNode.isInter) {
          newNode.isWall = false;
        }

        return newNode;
      })
    })

    setState(prev => ({ ...prev, grid }))
  }, [startNode, finishNode, interNode])

  const resetGrid = () => {
    setStartNode({ row: START_NODE_ROW, col: START_NODE_COL });
    setFinishNode({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });
    setInterNode(null);

    setState(prev => ({
      ...prev,
      grid: setInitialGrid(),
      mousePressed: false,
      inProgress: false,
      isStartPickup: false,
      isFinishPickup: false,
      isInterPickup: false,
      drawWall: true,
    }))

    state.grid.forEach(row => {
      row.forEach(node => {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'Node';

        if (node.lastRow) {
          document.getElementById(`node-${node.row}-${node.col}`).className += ' node-last-row';
        }
        
        if (node.lastCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className += ' node-last-col';
        }
      })
    })
  }

  const startVisualization = (algorithm) => {
    switch (algorithm) {
      case 'DIJKSTRA':
        visualizeAlgorithm(dijkstra, state.grid, startNode, finishNode, interNode, setState);
        break;
      case 'DEPTH-FIRST':
        visualizeAlgorithm(depthFirst, state.grid, startNode, finishNode, interNode, setState);
        break;
      case 'GREEDY':
        visualizeAlgorithm(greedyBfs, state.grid, startNode, finishNode, interNode, setState);
        break;
      case 'BREADTH-FIRST':
        visualizeAlgorithm(breadthFirst, state.grid, startNode, finishNode, interNode, setState);
        break;
      case 'A-STAR':
        visualizeAlgorithm(astar, state.grid, startNode, finishNode, interNode, setState);
        break;
      default:
        visualizeAlgorithm(dijkstra, state.grid, startNode, finishNode, interNode, setState);
        break;
    }

    return setState(prev => ({ ...prev, inProgress: true }));
  }

  const toggleWeight = () => {
    if (!state.inProgress) {
      const drawWall = !state.drawWall;
      setState(prev => ({ ...prev, drawWall }));
    }
  }

  const clearGrid = type => {
    const oldGrid = [...state.grid];

    const grid = oldGrid.map(row => {
      return row.map(node => {
        const newNode = { ...node };

        if (type === 'WALLS') {
          newNode.isWall = false;
        } else { // only other option is to clear weights
          newNode.isWeight = false;
        }

        return newNode;
      })
    })

    setState(prev => ({ ...prev, grid, drawWall: true }));
  }

  const loadWalls = (walls, type) => {
    const oldGrid = [...state.grid];
    let grid = [];
    const mazeWalls = [];

    if (type === 'MAZE') {
      for (const row of walls) {
        for (const node of row) {
          if (node.isWall) mazeWalls.push(node);
        }
      }
    }

    grid = oldGrid.map(row => {
      return row.map(node => {
        const newNode = {
          ...node,
          isWall: false,
          isWeight: false
        }

        if (type === 'MAZE') {
          for (const wall of mazeWalls) {
            if (wall.row === node.row && wall.col === node.col) {
              newNode.isWall = true;
            }
          }
        } else { // only other option is a map
          for (const row of walls) {
            for (const col of row.cols) {
              if (row.row_num === node.row && col === node.col && !node.isStart && !node.isFinish && !node.isInter) newNode.isWall = true;
            }
          }
        }

        return newNode;
      })
    })

    setState(prev => ({ ...prev, grid }));
  }

  const createInterNode = () => {
    if ((startNode.row === 7 && startNode.col === 22) || (finishNode.row === 7 && finishNode.col === 22)) {
      if ((startNode.row === 6 && startNode.col === 22) || (finishNode.row === 6 && finishNode.col === 22)) {
        setInterNode({ row: INTER_NODE_ROW + 1, col: INTER_NODE_COL })
        document.getElementById(`node-${INTER_NODE_ROW + 1}-${INTER_NODE_COL}`).className += ' node-inter';
      } else {
        setInterNode({ row: INTER_NODE_ROW - 1, col: INTER_NODE_COL })
        document.getElementById(`node-${INTER_NODE_ROW - 1}-${INTER_NODE_COL}`).className += ' node-inter';
      }
    } else {
      setInterNode({ row: INTER_NODE_ROW, col: INTER_NODE_COL })
      document.getElementById(`node-${INTER_NODE_ROW}-${INTER_NODE_COL}`).className += ' node-inter';
    }

  }

  return { state, interNode, mouseDown, mouseUp, togglePickup, toggleWall, moveNode, resetGrid, startVisualization, toggleWeight, clearGrid, loadWalls, createInterNode }
}