import React from "react";

export default function Stage3() {
  return (
    <div>
      <h3>Making Walls and Weighted Nodes</h3>
      <span className={"textBody"}>
        By clicking and dragging the mouse on an empty square on the grid, you
        can create a black marking across the grid which represents a ‘wall’.
        The walls represent barriers in the pathfinding visualizer which prevent
        the algorithm from reaching the end node.
      </span>
      <br></br>
      <br></br>
      <img
        src="images/stage3TutorialWalls.png"
        className={'image'}
      ></img>
      <br></br> 
      <span className={"textBody"}>
        You can also create weaker barriers called 'weights' which delay
        penetration of visualized algorithm. Toggle the 'Draw Weight' button to
        active the weights, and draw on the grid to do so.
      </span>
      <br></br>
      <img
        src="images/stage3TutorialDrawWall.png"
        className={'image'}
      ></img>
      <br></br>
      <img
        src="images/stage3TutorialWeights.png"
        className={'image'}
      ></img>
    </div>
  );
}

// 1st step: choose algo
// 2nd step: nodes & intermediate nodes
// 3rd stage: walls and weights;
// 4th stage: premade maze
// 5th stage: visualize
// 6th stage: reset// 1st step: choose algo
// 2nd step: nodes & intermediate nodes
// 3rd stage: walls and weights;
// 4th stage: premade maze
// 5th stage: visualize
// 6th stage: reset
