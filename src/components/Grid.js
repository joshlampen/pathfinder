import React, { useState } from "react";
import Node from "./Node";
import {
  setInitialGrid,
  resetCss} from "../helpers/gridHelpers";
import visualizeDijkstra from "../helpers/dijkstraHelpers";
import "../styles/Grid.css";

export default function Grid() {
  const [state, setState] = useState({
    grid: setInitialGrid(),
    mousePressed: false,
    inProgress: false,
    isStartPickup: false,
    isEndPickup: false,
    startRow: 0,
    startCol: 0,
    finishRow: 14,
    finishCol: 30,
    makeWall: true,
    makeWeight: false
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: true }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: false }));
  };
  
  function toggleWall(row, col, isWall, isStart, isFinish) {

    //if the user clicks on an empty square, create a wall
    if (!isStart && !isFinish && !state.inProgress && !state.isStartPickup && !state.isEndPickup && state.makeWall) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState((prev) => ({ ...prev, grid }));

      //if the user clicks on an empty square and the state is set to make weight, then create a weight
     } else if (!isStart && !isFinish && !state.inProgress && !state.isStartPickup && !state.isEndPickup && state.makeWeight) {
      const newNode = {
        ...state.grid[row][col],
        isWeighted: true,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState((prev) => ({ ...prev, grid }));

    //if the user clicks on a starting node, active node
    } else if (isStart && !state.isStartPickup && !state.inProgress) {

      setState((prev) => ({ ...prev, isStartPickup: true }));

    //while user is dragging starting node, create new grid and change state
    } else if (state.isStartPickup && state.mousePressed) {

      console.log(row, col);

      const setNewStart = () => {
        const grid = [];

        // for each row in the grid...
        for (let rowArray = 0; rowArray < 15; rowArray++) {
          const currentRow = [];

          // for each column in the row...
          for (let colValue = 0; colValue < 45; colValue++) {

            // resave all the nodes with a new isStart condition mapped to a new row and col value
            const newNode = {
              ...state.grid[rowArray][colValue],
              isStart: rowArray === row && colValue === col,
            };

            currentRow.push(newNode);
          }

          grid.push(currentRow);
        }

        return grid;
      };
      setState((prev) => ({
        ...prev,
        startRow: row,
        startCol: col,
        grid: setNewStart(),
      }));

    //when user stops dragging the node, stop moving the node
    } else if (state.isStartPickup && !state.mousePressed) {

      setState((prev) => ({ ...prev, isStartPickup: false }));


    //if the user clicks on a ending node, active node

    } else if (isFinish && !state.isEndPickup &&!state.inProgress) {

      console.log("clicked");
      setState((prev) => ({ ...prev, isEndPickup: true }));

    //while user is dragging ending node, create new grid and change state
  } else if (state.isEndPickup && state.mousePressed) {

    console.log(row, col);

    const setNewEnd = () => {
      const grid = [];

      // for each row in the grid...
      for (let rowArray = 0; rowArray < 15; rowArray++) {
        const currentRow = [];

        // for each column in the row...
        for (let colValue = 0; colValue < 45; colValue++) {

          // resave all the nodes with a new isStart condition mapped to a new row and col value
          const newNode = {
            ...state.grid[rowArray][colValue],
            isFinish: rowArray === row && colValue === col,
          };

          currentRow.push(newNode);
        }

        grid.push(currentRow);
      }

      return grid;
    };

    setState((prev) => ({
      ...prev,
      finishRow: row,
      finishCol: col,
      grid: setNewEnd(),
    }));


  //when user is finished dragging ending node, create new grid and change state

  } else if (state.isEndPickup && !state.mousePressed) {

    setState((prev) => ({ ...prev, isEndPickup: false }));
  }
}

  return (
    <div
      className="Grid"
      onMouseDown={() => mouseDown()}
      onMouseUp={() => mouseUp()}
    >
      {state.grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const {
            row,
            col,
            isStart,
            isFinish,
            isVisited,
            isWall,
            isWeighted,
          } = node;
          return (
            <Node
              key={nodeIndex}
              row={row}
              col={col}
              isStart={isStart}
              isFinish={isFinish}
              isVisited={isVisited}
              isWall={isWall}
              isWeighted={isWeighted}
              mousePressed={state.mousePressed}
              toggleWall={toggleWall}
            />
          );
        });
      })}
      <button
        onClick={() => {
          if (state.inProgress || state.inProgress === 'done') {
            return;
          } else {
            setState((prev) => ({ ...prev, inProgress: true }));
            visualizeDijkstra(
              state.grid,
              state.startRow,
              state.startCol,
              state.finishRow,
              state.finishCol,
              setState
            );
          }
        }}
      >
        Please Work!
      </button>
      <button
        onClick={() => {
          if (!state.inProgress && state.makeWall) {
            setState(prev => ({
              ...prev,
              makeWall: false,
              makeWeight: true
            }))
          } else {
            setState(prev => ({
              ...prev,
              makeWall: true, 
              makeWeight: false
            }))
          }
        }}
      >
        {state.makeWall ? "Make weights" : "Make walls"}
      </button>
      <button
        onClick={() => {
          if (state.inProgress === 'done' || !state.inProgress) {
            resetCss(state.grid)
            setState(prev => ({
              ...prev,
              grid: setInitialGrid(),
              mousePressed: false,
              isStartPickup: false,
              isEndPickup: false,
              startRow: 0,
              startCol: 0,
              finishRow: 14,
              finishCol: 30,
              inProgress: false,
              makeWall: true,
              makeWeight: false
            }))
          } else {
            return;
          }
        }}
      >
        Refresh
      </button>
    </div>
  );
}
