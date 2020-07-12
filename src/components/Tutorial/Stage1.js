import React from "react";

export default function Stage1() {
  return (
    <div>
      <h3>Choosing Algorithms</h3>
      <span className={"textBody"}>
        Pathfinder offers a variety of algorithms to visualize on the
        grid. By default, the app renders{" "}
        <strong> Dijkstra’s Algorithm </strong>.
      </span>
      <br></br>
      <span className={"textBody"}>
        To choose an algorithm, click the
        'Select Algorithm' button on the navigation bar.
      </span>
      <br></br>
      <br></br>
      <img src='/gifs/select-algorithm.gif' className='gif'></img>
      <br></br>
    </div>
  );
}

