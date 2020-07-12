import React, { useEffect }from "react";


export default function Stage2() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      
      <h3>Nodes</h3>

      <span className={"textBody"}>
        You can also set the starting and ending nodes on the grid. They are
        identified by the icons in the green (starting) and red (ending) marked
        boxes in the picture below.
        <br></br>
        <br></br>
        To move them, simply click on the node, and hold down your mouse button
        while moving the mouse on the grid.{" "}
      </span>
      <br></br>
      <img src="images/stage2TutorialNodes.png" className={"image"}></img>
      <br></br>
      <span className={"textBody"}>
        You can even set a second ‘intermediary’ node by clicking on the green
        ‘add node’ button which generates the node on the grid.{" "}
      </span>
      <br></br>
      <img src="images/stage2TutorialAddNode.png" className={"image"}></img>
      <br></br>
    </div>
  );
}
