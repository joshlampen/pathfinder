import React, { useState, useEffect } from "react";
import visualizeDijkstra from "../algorithms/dijkstra";
import visualizeBreadthFirst from "../algorithms/breadthFirst";
import visualizeDepthFirst from "../algorithms/depthFirst";
import visualizeAstar from "../algorithms/astar";

export default function useGridData() {
  const [startNode, setStartNode] = useState({ row: 7, col: 4 });
  const [finishNode, setFinishNode] = useState({ row: 7, col: 40 });
  const [interNode, setInterNode] = useState(null);

  const setInitialGrid = () => {   // create the initial array of node objects
    const grid = [];
    
    // for each row in the grid... 
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
  
      // for each column in the row...
      for (let col = 0; col < 45; col++) {
  
        // create node and push
        currentRow.push(createNode(row, col));
      }
      
      grid.push(currentRow);
    }
  
    return grid;
  }
  
  // creates the nodes that are pushed into the initial grid array
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
    //if the user clicks on an empty square, create a wall
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
    } else if (!state.inProgress && !state.drawWall) {
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
    setStartNode({ row: 7, col: 4 });
    setFinishNode({ row: 7, col: 40 });
    setInterNode(null)

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
        visualizeDijkstra(state.grid, startNode, finishNode, interNode, setState);
        break;
      case 'DEPTH-FIRST':
        visualizeDepthFirst(state.grid, startNode, finishNode, setState);
        break;
      case 'BREADTH-FIRST':
        visualizeBreadthFirst(state.grid, startNode, finishNode, setState);
        break;
      case 'A-STAR':
        visualizeAstar(state.grid, startNode, finishNode, setState);
        break;
    }

    return setState(prev => ({ ...prev, inProgress: true }));
  }

  const toggleWeight = () => {
    if (!state.inProgress) {
      const drawWall = !state.drawWall
      setState(prev => ({ ...prev, drawWall }));
    }
  }

  const clearWeights = () => {
    const oldGrid = [...state.grid];

    const grid = oldGrid.map(row => {
      return row.map(node => {
        const newNode = {
          ...node,
          isWeight: false
        };

        return newNode;
      })
    })

    setState(prev => ({ ...prev, grid, drawWall: true }))
  }

  const loadWalls = walls => {
    const oldGrid = [...state.grid];
  
    const grid = oldGrid.map(row => {
      return row.map(node => {

        for (const row of walls) {

          for(const col of row.cols)

          if (row.row_num === node.row && col === node.col) {
            const newNode = {
              ...node,
              isWall: true
            }

            if (newNode.isStart || newNode.isFinish || newNode.isInter) {
              newNode.isWall = false;
            }
    
            return newNode;
          }
        }
  
        return node;
      })
    })

    setState(prev => ({ ...prev, grid }))
  }


  const createInterNode = () => {
    if ((startNode.row === 7 && startNode.col === 22) || (finishNode.row === 7 && finishNode.col === 22)) {
      if ((startNode.row === 6 && startNode.col === 22) || (finishNode.row === 6 && finishNode.col === 22)) {
        setInterNode({ row: 8, col: 22 })
      } else {
        setInterNode({ row: 6, col: 22 })
      }
    } else {
      setInterNode({ row: 7, col: 22 })
    }
  }

  return { state, interNode, mouseDown, mouseUp, togglePickup, toggleWall, moveNode, resetGrid, startVisualization, toggleWeight, clearWeights, loadWalls, createInterNode }
}