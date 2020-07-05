import React, { useState, useEffect } from "react";
import setInitialGrid from "../helpers/gridHelpers";
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
    } else {
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

  const toggleWall = (row, col, isWall) => {
    //if the user clicks on an empty square, create a wall
    if (!state.inProgress && !state.isPickup) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState(prev => ({ ...prev, grid }));
    }
  }

  useEffect(() => {
    const grid = setInitialGrid();

    setState(prev => ({ ...prev, grid }))
  }, [startNode, finishNode])

  const resetGrid = (grid) => {
    setStartNode({ row: 7, col: 4 });
    setFinishNode({ row: 7, col: 40 });

    setState({
      grid: setInitialGrid(),
      mousePressed: false,
      inProgress: false,
      isStartPickup: false,
      isFinishPickup: false,
    })

    state.grid.forEach(row => {
      row.forEach(node => {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'Node'
      })
    })
  }

  const startVisualization = () => {
    if (state.inProgress || state.inProgress === 'done') {
      return;
    } else {
      setState(prev => ({ ...prev, inProgress: true }));

      visualizeDijkstra(state.grid, startNode, finishNode);
    }
  }

  return { state, mouseDown, mouseUp, togglePickup, toggleWall, moveNode, resetGrid, startVisualization }
}