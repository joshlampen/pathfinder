import React from 'react'
// import '../styles/Tutorials.css'

// images:
// Algorithm button
// Grid description with the wall/weight buttons

export default function Stage1() {


  return (

    <div>
      <h3>Choosing Algorithms</h3>
      <span className={"textBody"}>Pathfinder uses a number of different algorithms to visualize on the grid. By default, the app renders <strong> Dijkstra’s Algorithm </strong> once loaded.
</span>
      <br></br>
      <span className={"textBody"}>In order to select an algorithm to render on the page, click the following toggle button on the upper right hand corner the screen
</span>
<br></br>
      <img id='menu' src='images/stage1TutorialMenu.png'></img> 
      <br></br> 
      <span className={"textBody"}>Once selected, you should notice a change on the algorithm’s description above the grid. 
</span>
<br></br>
<img id='desc' src='images/stage1TutorialDesc.png'></img> 
    </div>

  )
}












// 1st step: choose algo
// 2nd step: nodes & intermediate nodes
// 3rd stage: walls and weights;
// 4th stage: premade maze
// 5th stage: visualize
// 6th stage: reset