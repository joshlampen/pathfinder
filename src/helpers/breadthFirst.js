import { getShortestPathNodes, animateShortestPath } from '../helpers/dijkstraHelpers'

export const getNeighborsBreadthFirst = (node, grid) => {
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

export const breadthFirst = (grid, start, end) => {
  let queue = [start];
  let visitedNodes = [start];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === end) {
      return visitedNodes;
    }
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        if (queue.indexOf(neighbor) < 0) {
          queue.push(neighbor);
        }
      }
    })
  }
  return visitedNodes;
}

export const animateBreadthFirst = (visitedNodesInOrder, shortestPathNodes, setState) => {
	for (let i = 0; i <= visitedNodesInOrder.length; i++) { // once all nodes are animated, animate the shortest path
		const node = visitedNodesInOrder[i]

		if (i === visitedNodesInOrder.length) {
			setTimeout(() => {
				animateShortestPath(shortestPathNodes, setState);
			}, 10 * i)
		} else {
			setTimeout(() => {
				// for each node in the array, add the 'visited' class
				document.getElementById(`node-${node.row}-${node.col}`).className += ' node-visited';
			}, 10 * i)
		}
  }
}

export default function visualizeBreadthFirst(grid, startNode, finishNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = breadthFirst(grid, startNodeObj, finishNodeObj);
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

	animateBreadthFirst(visitedNodesInOrder, shortestPathNodes, setState);
}