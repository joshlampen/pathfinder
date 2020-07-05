import React from "react";
import Node from "./Node";
import Button from "./Button";
import useGridData from "../hooks/useGridData";
import "../styles/Grid.css";

export default function Grid() {
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
  } = useGridData()
  
  return (
    <div>
      <section>
        <Button
          text='Visualize'
          onClick={startVisualization}
        />
        <Button
          text='Reset Grid'
          onClick={resetGrid}
        />
        <Button
          text='Draw Wall'
          onClick={toggleWeight}
          selected={state.makeWall}
        />
        <Button
          text='Draw Weight'
          onClick={toggleWeight}
          selected={!state.makeWall}
        />
      </section>
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