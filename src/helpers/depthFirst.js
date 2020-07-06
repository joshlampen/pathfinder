
//Go north, go east, south, go west
const createNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === 1 && col === 1,
    isFinish: row === 3 && col === 3,
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

const setInitialGrid = () => {   // create the initial array of node objects
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

const getUnvisitedNeighbors = (node, grid) => {
	const neighbors = [];

	const { row, col } = node;

	if (row > 0) neighbors.push(grid[row - 1][col]); // add the node above
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // add the node below
  if (col > 0) neighbors.push(grid[row][col - 1]); // add the node to the left		
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // add the node to the right

	return neighbors.filter(neighbor => !neighbor.isVisited); // ensure the node has not been visited before
}

// establish the neighbors for the new node being analyzed by changing distance from infinity to 0
const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

	for (const neighbor of unvisitedNeighbors) {
		if (node.isWeighted) {
			neighbor.distance = node.distance + 3;
			neighbor.previousNode = node
		} else {
			neighbor.distance = node.distance + 1;
			neighbor.previousNode = node;			
		}
	}
}

const removeNestedNodes = grid => {
	const nodes = [];

	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}

	return nodes;
}

// [
//   [1, 2, 3]
//   [4, 5, 6]
//   [7, 8, 9]
// ]

// 1, 2, 3, 6, 5, 4, 7, 8, 9

const sortBackwards = row => {
  
}

const dfsSort = grid => {
  let nodes = [];
  let reverseOrd = [];

  grid.forEach((row, rowIdx) => {
    row.forEach((node) => {
      if (rowIdx === 0 || rowIdx % 2 === 0) {
        nodes = nodes.concat(reverseOrd);
        reverseOrd = [];
        nodes.push(node)
      } else if (rowIdx % 2 !== 0) {
        reverseOrd.unshift(node)
      }
    })
  })
  return nodes;
}

console.log(dfsSort(setInitialGrid()))