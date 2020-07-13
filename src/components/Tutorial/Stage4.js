import React from "react";

export default function Stage4() {
  return (
    <div>
      <h3>Mazes and Maps</h3>
      <span className="textBody">
        You can also click the 'Generate Maze' button on the toolbar to generate a random maze of walls.
      </span>
      <br></br>
      <span className="textBody">
        Or, you can click the 'Load Map' button on the toolbar to choose from a selection of pre-made
        wall configurations.
      </span>
      <br></br>
      <br></br>
      <img src='gifs/maze-maps.gif' className='gif'></img>
    </div>
  );
}
