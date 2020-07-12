import React from "react";

export default function Stage3() {
  return (
    <div>
      <h3>Drawing Walls and Weights</h3>
      <span className='textBody'>
        You can draw walls that the algorithm must move around when attempting to find the shortest
        path. To draw walls, select 'Draw Wall' from the toolbar and click and drag across the grid.
      </span>
      <br></br> 
      <span className='textBody'>
        For weighted algorithms, you can also draw weights which require more 'work' to pass through than
        a regular unvisited node. To draw weights, select 'Draw Weight' from the toolbar and click and drag
        across the grid.
      </span>
      <br></br>
      <br></br>
      <img src='gifs/draw.gif' className='gif'></img>
    </div>
  );
}

