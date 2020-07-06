export const testGrid = () => {   // create the initial array of node objects
  const grid = [];
  
  // for each row in the grid... 
  for (let row = 0; row < 5; row++) {
    const currentRow = [];

    // for each column in the row...
    for (let col = 0; col < 5; col++) {

      // create node and push
      currentRow.push(createNode(row, col));
    }
    
    grid.push(currentRow);
  }

  return grid;
}

// creates the nodes that are pushed into the initial grid array
export const createNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === 0 && col === 0,
    isFinish: row === 1 && col === 1,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeighted: false,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
  };
  
  return node;
}

export const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }
  
  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1])
  }
  return neighbors;
}

export const bfs = (start, end, grid) => {
  let queue = [start];
  let visitedNodes = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    if (currentNode === end) {
      return visitedNodes;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor)
      }
    })
  }
  return visitedNodes;
}