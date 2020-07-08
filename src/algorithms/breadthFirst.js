import { getShortestPathNodes, animateShortestPath } from './dijkstra'

export const getNeighborsBreadthFirst = (node, grid) => {
  const neighbors = [];
  
  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1])
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
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

export const animateBreadthFirst = (firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState) => {
	for (let i = 0; i <= firstVisitedNodesInOrder.length; i++) { // once all nodes are animated, animate the shortest path
		const node = firstVisitedNodesInOrder[i]

		if (i === firstVisitedNodesInOrder.length) {
			setTimeout(() => {
        animateShortestPath(firstShortestPathNodes, setState);
        if (secondVisitedNodesInOrder) {
          animateBreadthFirst(secondVisitedNodesInOrder, secondShortestPathNodes, null, null, setState)
        }
			}, 10 * i)
		} else {
			setTimeout(() => {
        // for each node in the array, add the 'visited' class
        if (node.lastRow) {
          document.getElementById(`node-${node.row}-${node.col}`).className += ' node-visited-last-row';
        } 
        
        if (node.lastCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className += ' node-visited-last-col';
        }

				document.getElementById(`node-${node.row}-${node.col}`).className += ' node-visited';
			}, 10 * i)
		}
  }
}

export default function visualizeBreadthFirst(grid, startNode, finishNode, interNode, setState) {
  const firstGrid = grid.map(row => {
    return row.map(node => {
      const newNode = {
        ...node,
        isVisited: false,
      }

      return newNode
    })
  })

  const secondGrid = grid.map(row => {
    return row.map(node => {
      const newNode = {
        ...node,
        isVisited: false,
      }

      return newNode
    })
  })
  
  const startNodeObj = firstGrid[startNode.row][startNode.col];
  const firstInterNodeObj = interNode ? firstGrid[interNode.row][interNode.col] : null;
  const secondInterNodeObj = interNode ? secondGrid[interNode.row][interNode.col] : null;
  const finishNodeObj = interNode ? secondGrid[finishNode.row][finishNode.col] : firstGrid[finishNode.row][finishNode.col];

  const firstVisitedNodesInOrder = interNode ? breadthFirst(firstGrid, startNodeObj, firstInterNodeObj) : breadthFirst(firstGrid, startNodeObj, finishNodeObj);
  const secondVisitedNodesInOrder = interNode ? breadthFirst(secondGrid, secondInterNodeObj, finishNodeObj) : null

  const firstShortestPathNodes = interNode ? getShortestPathNodes(startNodeObj, firstInterNodeObj) : getShortestPathNodes(startNodeObj, finishNodeObj);
  const secondShortestPathNodes = interNode ? getShortestPathNodes(secondInterNodeObj, finishNodeObj) : null;

  animateBreadthFirst(firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState);
}