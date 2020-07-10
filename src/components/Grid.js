import React, { useEffect } from "react";
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
    clearGrid,
    loadWalls,
    createInterNode,
  } = useGridData();

  const {
    mazeWalls,
    generateMazeWalls,
    generateMaze
  } = useMaze();

  useEffect(() => {
    const maze = generateMaze(state.grid, mazeWalls)
    loadWalls(maze, 'MAZE')
  }, [mazeWalls])

  useEffect(() => {
    if (algorithm === 'BREADTH-FIRST' || algorithm === 'DEPTH-FIRST') {
      clearGrid('WEIGHTS');
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
            text='&nbsp;Add Node&nbsp;'
            size='small'
            color='secondary'
            onClick={createInterNode}
            inProgress={state.inProgress}
            interNode={interNode}
          />
        <BasicButton
            text='&nbsp;Generate Maze&nbsp;'
            size='small'
            color='secondary'
            onClick={() => generateMazeWalls(state.grid, 0, 14, 0, 44, 'horizontal', null)}
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