import React, { useEffect } from "react";
import axios from "axios";
import Node from "./Node";
import BasicButton from "./BasicButton";
import Toggle from "./Toggle";
import useGridData from "../hooks/useGridData";
import "../styles/Grid.css";
import "../styles/ToolBar.css";

export default function Grid(props) {
  const { algorithm, toggleCounter, toggleNavDisable } = props;

  const {
    state,
    mouseDown,
    mouseUp,
    togglePickup,
    toggleWall,
    moveNode,
    resetGrid,
    startVisualization,
    toggleWeight,
    clearWeights
  } = useGridData()

  useEffect(() => {
    if (algorithm !== 'DIJKSTRA') {
      clearWeights();
    } 
  }, [algorithm])

  useEffect(() => {
    state.inProgress ? toggleNavDisable(true) : toggleNavDisable(false);
  }, [state.inProgress])

  const manageVisualization = (algorithm) => {
    Promise.resolve(axios.put("/counters/2"))
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
            color='secondary'
            onClick={resetGrid}
            inProgress={state.inProgress}
            />
        </section>
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
                moveNode={moveNode}
              />
            );
          });
        })}
      </div>
    </div>
  );
}