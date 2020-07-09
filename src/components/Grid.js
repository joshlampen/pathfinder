import React, { useState, useEffect } from "react";
import axios from "axios";
import Node from "./Node";
import BasicButton from "./BasicButton";
import ToolBarDropdown from "./ToolBarDropdown";
import Toggle from "./Toggle";
import useGridData from "../hooks/useGridData";
import useMaze from "../hooks/useMaze";
import "../styles/Grid.css";
import "../styles/ToolBar.css";

export default function Grid(props) {
  const { algorithm, toggleCounter, toggleNavDisable } = props;

  const {
    state,
    interNode,
    mouseDown,
    mouseUp,
    togglePickup,
    toggleWall,
    moveNode,
    resetGrid,
    startVisualization,
    toggleWeight,
    clearWeights,
    loadWalls,
    createInterNode,
    loadWalls2
  } = useGridData();

  const {
    mazeWalls,
    generateMaze
  } = useMaze();

  useEffect(() => {
    const maze = state.grid.map(row => {
      return row.map(node => {
        const newNode = { ...node }

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

    loadWalls2(maze)
  }, [mazeWalls])

  useEffect(() => {
    if (algorithm !== 'DIJKSTRA') {
      clearWeights();
    } 
  }, [algorithm])

  useEffect(() => {
    state.inProgress ? toggleNavDisable(true) : toggleNavDisable(false);
  }, [state.inProgress])

  const manageVisualization = (algorithm) => {
    Promise.resolve(axios.put("/counters/1"))
      .then(() => {
        toggleCounter();
        toggleNavDisable()
        startVisualization(algorithm);
      })
  }

  return (
    <div>
      <div className='ToolBar'>
        <section className='Buttons'>
          <BasicButton
            text='&nbsp;Visualize&nbsp;'
            size='large'
            color='primary'
            onClick={() => manageVisualization(algorithm)}
            inProgress={state.inProgress}
          />
          <BasicButton
            text='Reset Grid'
            size='small'
            color='primary'
            onClick={resetGrid}
            inProgress={state.inProgress}
          />
        </section>
        <span className='toolbar-left-spacer'>&nbsp;</span>
        <section className='Tools'>
        <BasicButton
            text='Add Node'
            size='small'
            color='secondary'
            onClick={createInterNode}
            inProgress={state.inProgress}
            interNode={interNode}
          />
        <BasicButton
            text='Generate Maze'
            size='small'
            color='secondary'
            onClick={() => generateMaze(state.grid, 0, 14, 0, 44, 'horizontal', null)}
            inProgress={state.inProgress}
          />
          <ToolBarDropdown
            inProgress={state.inProgress}
            loadWalls={loadWalls}
          />
        </section>
        <span className='toolbar-right-spacer'>&nbsp;</span>
        <section className='Toggle'>
          <Toggle
            drawWall={state.drawWall}
            toggleWeight={toggleWeight}
            inProgress={state.inProgress}
            algorithm={algorithm}
          />
        </section>
      </div>
      <div
        className="Grid"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}  
      >
        {state.grid.map((row, rowIndex) => {
          return row.map((node, nodeIndex) => {
            const {
              row,
              col,
              isStart,
              isFinish,
              isInter,
              isVisited,
              isWall,
              isWeight,
              lastRow,
              lastCol
            } = node;
            return (
              <Node
                key={nodeIndex}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isInter={isInter}
                isVisited={isVisited}
                isWall={isWall}
                isWeight={isWeight}
                lastRow={lastRow}
                lastCol={lastCol}
                mousePressed={state.mousePressed}
                toggleWall={toggleWall}
                togglePickup={togglePickup}
                isStartPickup={state.isStartPickup}
                isFinishPickup={state.isFinishPickup}
                isInterPickup={state.isInterPickup}
                moveNode={moveNode}
              />
            );
          });
        })}
      </div>
    </div>
  );
}