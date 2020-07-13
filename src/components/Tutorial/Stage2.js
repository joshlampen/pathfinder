import React, { useEffect }from "react";


export default function Stage2() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      <h3>Nodes</h3>
      <span className='textBody'>
        Your algorithm of choice will attempt to find the shortest path from the start node (left) to the
        end node (right). You can move these nodes by clicking and dragging them across the grid.
      </span> 
      <br></br>
      <span className='textBody'>
        To add an intermediate node to the grid, click the 'Add Node' button on the toolbar.
      </span>
      <br></br>
      <br></br>
      <img src='gifs/move-nodes.gif' className='gif'></img>
    </div>
  );
}
