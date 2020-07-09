import React from 'react';
import finishedVisualization from '../../images/pre-made-maps.png'
import refreshed from '../../images/refreshed.png'

export default function Stage6() {

  return (
    <div>
      <h3>Reset Grid</h3>
      <span>Once you've visualized your desired algorithm, you can set the grid back to its original state by clicking 'Reset Grid'</span>
      <br></br>
      <img src={finishedVisualization} width='480px'></img>
      <br></br>
      <img src={refreshed} width='480px'></img>
    </div>

  )
}