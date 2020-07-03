const START_NODE_ROW = 7
const START_NODE_COL = 5

const FINISH_NODE_ROW = 7
const FINISH_NODE_COL = 20

// creates the nodes that are pushed into the grid array
const createNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };

  return node;
}

// create the initial array of node objects
const setInitialGrid = () => {
  const grid = [];
  
  // for each row in the grid... 
  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    // for each column in the row...
    for (let col = 0; col < 50; col++) {

      // create node and push
      currentRow.push(createNode(row, col));
    }
  
    grid.push(currentRow);
  }

  return grid;
}

export { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid }