import React from "react";

export default function Stage1() {
  return (
    <div>
      <h3>Choosing Algorithms</h3>
      <span className={"textBody"}>
        Pathfinder uses a number of different algorithms to visualize on the
        grid. By default, the app renders{" "}
        <strong> Dijkstra’s Algorithm </strong> once loaded.
      </span>
      <br></br>
      <span className={"textBody"}>
        In order to select an algorithm to render on the page, click the
        following toggle button on the upper right hand corner the screen
      </span>
      <br></br>
      <img src="images/stage1TutorialMenu.png" className={'image'}></img>
      <br></br>
      <span className={"textBody"}>
        Once selected, you should notice a change on the algorithm’s description
        above the grid.
      </span>
      <br></br>
      <img id="desc" src="images/stage1TutorialDesc.png" className={'image'}></img>
    </div>
  );
}

