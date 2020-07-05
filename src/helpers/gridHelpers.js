export default function setInitialGrid() {   // create the initial array of node objects
  const grid = [];
  
  // for each row in the grid... 
  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    // for each column in the row...
    for (let col = 0; col < 45; col++) {

      // create node and push
      currentRow.push(createNode(row, col));
    }
  
    grid.push(currentRow);
  }

  return grid;
}

// creates the nodes that are pushed into the initial grid array
const createNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === 7 && col === 4,
    isFinish: row === 7 && col === 40,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
  };

  return node;
}