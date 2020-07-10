// establish the neighbors for the new node being analyzed by changing distance from infinity to 0
export const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getNeighborsQueue(node, grid).filter(neighbor => !neighbor.isVisited)

	for (const neighbor of unvisitedNeighbors) {
		if (node.isWeight) {
			neighbor.distance = node.distance + 3;
			neighbor.previousNode = node;
		} else {
			neighbor.distance = node.distance + 1;
			neighbor.previousNode = node;			
		}
	}
}

// sort nodes by distance so that the neighboring nodes are at the beginning of the array
export const sortNodesByDistance = unvisitedNodes => {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// loops through the grid array and removes the nested layers of the nodes
export const removeNestedNodes = grid => {
	const nodes = [];

	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}

	return nodes;
}

export const getNeighborsStack = (node, grid) => {
  const neighbors = [];

  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.unshift(grid[row - 1][col]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.unshift(grid[row][col + 1]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.unshift(grid[row + 1][col]);
  }
  
  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.unshift(grid[row][col - 1])
  }
  return neighbors;
}

export const getNeighborsQueue = (node, grid) => {
  const neighbors = [];
  
  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1])
  }

  return neighbors;
}

export const heuristic = (currentNode, endNode) => {
  const differenceInCol = Math.pow(currentNode.col - endNode.col, 2);
  const differenceInRow = Math.pow(currentNode.row - endNode.row, 2);
  
  return Math.sqrt(differenceInCol + differenceInRow);
}

export const getShortestPathNodes = (startNode, finishNode) => {
  const path = [];

  let currentNode = finishNode;

	while (currentNode && !(startNode.row === currentNode.row && startNode.col === currentNode.col)) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode; // once we reach the start node, this becomes null and the loop breaks
  }

  path.unshift(currentNode);

  if (!path.includes(startNode)) return []; // if the path doesn't include the start node there is no shortest path
  
	return path;
}