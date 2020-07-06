import React from "react";
import Node from "./Node";
import BasicButton from "./BasicButton";
import Toggle from "./Toggle";
import useGridData from "../hooks/useGridData";
import "../styles/Grid.css";
import "../styles/ToolBar.css";

export default function Grid() {
  const {
    state,
    setState,
    mouseDown,
    mouseUp,
    togglePickup,
    toggleWall,
    moveNode,
    resetGrid,
    startVisualization,
    toggleWeight,
  } = useGridData()
  
  return (
    <div>
      <div className='ToolBar'>
        <section className='Buttons'>
          <BasicButton
            text='Visualize'
            size='large'
            color='primary'
            onClick={startVisualization}
          />
          <BasicButton
            text='Reset Grid'
            size='small'
            color='secondary'
            onClick={resetGrid}
          />
        </section>
        <section className='Toggle'>
          <Toggle
            drawWall={state.drawWall}
            toggleWeight={toggleWeight}
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