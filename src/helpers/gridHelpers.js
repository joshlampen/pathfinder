const START_NODE_ROW = 0
const START_NODE_COL = 0

const FINISH_NODE_ROW = 14
const FINISH_NODE_COL = 30

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
    isWeighted: col === 0 && row === 5 || col === 0 && row === 8, //test
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
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

const resetCss = (grid) => {
  grid.forEach(row => {
    row.forEach(node => {
      document.getElementById(`node-${node.row}-${node.col}`).className = 'Node'
    })
  })
}

export { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, setInitialGrid, resetCss }