import React, { useState } from "react";
import Node from "./Node";
import useGridData from "../hooks/useGridData";
import visualizeDijkstra from "../helpers/dijkstraHelpers";
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
    startVisualization
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
        Refresh
      </button>
    </div>
  );
}