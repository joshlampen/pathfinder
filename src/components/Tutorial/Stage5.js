import React from 'react';
import visualization from '../../images/Start-visualization.png'
import finishedVisualization from '../../images/face-visualization.png'

export default function Stage5() {

  return (

    <div>
      
      <h3>Visualize the Algorithm</h3>
      <span>Once you've added your desired walls, weights and nodes, you can now visualize the algorithm!</span>
      <br></br>
      <img src={visualization} width='480px'></img>
      <br></br>
      <img src={finishedVisualization} width='480px'></img>
      
    </div>

  )
}