import React, { useState, useEffect } from "react";
import visualizeDijkstra from "../helpers/dijkstraHelpers";

export default function useGridData() {
  const [startNode, setStartNode] = useState({ row: 7, col: 4 });
  const [finishNode, setFinishNode] = useState({ row: 7, col: 40 });

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
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isWeighted: false,
      previousNode: null,
      mousedown: false,
      onMouseEnter: false,
      onMouseUp: false,
    };
    
    return node;
  }
  
  const [state, setState] = useState({
    grid: setInitialGrid(),
    mousePressed: false,
    inProgress: false,
    isStartPickup: false,
    isFinishPickup: false,
    makeWall: true,
    makeWeight: false
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: true }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, isStartPickup: false, isFinishPickup: false, mousePressed: false }));
  };

  const togglePickup = (row, col, isStart, isFinish) => {
    // if a user clicks on the start node, activate the node
    if (isStart && !state.isStartPickup && !state.inProgress) {
      setState(prev => ({ ...prev, isStartPickup: true }));
      moveNode(row, col, isStart, isFinish)
    } else if (isFinish && !state.isFinishPickup && !state.inProgress) {
      setState(prev => ({ ...prev, isFinishPickup: true }));
      moveNode(row, col, isStart, isFinish)
    }
  }

  const moveNode = (row, col, isStartPickup, isFinishPickup) => {
    const newNode = { row, col }
    if (isStartPickup) {
      setStartNode(newNode);
    } else {
      setFinishNode(newNode);
    }
  }

  const toggleWall = (row, col, isWall, isWeighted) => {
    //if the user clicks on an empty square, create a wall
    if (!state.inProgress && state.makeWall) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
        isWeighted: false
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState(prev => ({ ...prev, grid }));
    } else if (!state.inProgress && !state.makeWall) {
      const newNode = {
        ...state.grid[row][col],
        isWeighted,
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
        };

        if (newNode.isStart || newNode.isFinish) {
          newNode.isWall = false;
        }

        return newNode;
      })
    })

    setState(prev => ({ ...prev, grid }))
  }, [startNode, finishNode])

  const resetGrid = () => {
    if (state.inProgress === true) {
      return;
    } else {
      setStartNode({ row: 7, col: 4 });
      setFinishNode({ row: 7, col: 40 });
  
      setState({
        grid: setInitialGrid(),
        mousePressed: false,
        inProgress: false,
        isStartPickup: false,
        isFinishPickup: false,
        makeWall: true,
        makeWeight: false
      })
  
      state.grid.forEach(row => {
        row.forEach(node => {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'Node'
        })
      })
    }
  }

  const startVisualization = () => {
    if (state.inProgress || state.inProgress === 'done') {
      return;
    } else {
      setState(prev => ({ ...prev, inProgress: true }));

      visualizeDijkstra(state.grid, startNode, finishNode, setState)
    }
  }

  const toggleWeight = () => {
    if (!state.inProgress && state.makeWall) {
      setState(prev => ({ ...prev, makeWall: false, makeWeight: true }))
    } else if(!state.inProgress && !state.makeWall) {
      setState(prev => ({ ...prev, makeWall: true, makeWeight: false }))
    }
  }

  return { state, mouseDown, mouseUp, togglePickup, toggleWall, moveNode, resetGrid, startVisualization, toggleWeight }
}