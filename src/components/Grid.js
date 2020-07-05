import React from "react";
import Node from "./Node";
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
              togglePickup={togglePickup}
              isStartPickup={state.isStartPickup}
              isFinishPickup={state.isFinishPickup}
              moveNode={moveNode}
            />
          );
        });
      })}
      <button
        onClick={startVisualization}
      >
        Please Work!
      </button>
      <button
        onClick={resetGrid}
      >
        Reset
      </button>
      <button
        onClick={toggleWeight}
      >
        {state.makeWall ? "Make weights" : "Make walls"}
      </button>
    </div>
  );
}