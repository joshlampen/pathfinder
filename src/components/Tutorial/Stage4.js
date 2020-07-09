import React from 'react';
import map from '../../images/load-map.png';

export default function Stage4() {

  return (

    <div>
      
      <h3>Mazes and Maps</h3>

      <span>Click on 'Generate Maze' to generate a random maze</span>
      <br></br>
      {/* picture of maze */}
      <img></img>
      <br></br>
      <span>You can also click on 'Load Map' to choose from a selection of pre-defined maps</span>
      <br></br>
      <img src={map} width='480px'></img>
      
    </div>

  )
}