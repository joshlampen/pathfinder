import React from "react";

export default function Stage4() {
  return (
    <div>
      <h3>Mazes and Maps</h3>

      <span className="textBody">
        Click on 'Generate Maze' to generate a random maze
      </span>
      <br></br>
      <img src="images/stage4TutorialMaze.png" className="image"></img>
      <br></br>
      <span className="textBody">
        You can also click on 'Load Map' to choose from a selection of
        pre-defined maps
      </span>
      <br></br>
      <img src="images/stage4TutorialLoadMap.png" className="image"></img>
    </div>
  );
}
