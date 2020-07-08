// get the unvisited neighboring nodes for the node being analyzed
export const getUnvisitedNeighbors = (node, grid) => {
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
		if (node.isWeight) {
			neighbor.distance = node.distance + 3;
			neighbor.previousNode = node
		} else {
			neighbor.distance = node.distance + 1;
			neighbor.previousNode = node;			
		}
	}
}

// sort nodes by distance so that the neighboring nodes are at the beginning of the array
const sortNodesByDistance = unvisitedNodes => {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// loops through the grid array and removes the nested layers of the nodes
const getUnvisitedNodes = (grid, prevVisitedNodes) => {
  const unNestedNodes = [];
  let unVisitedNodes = [];

  for (const row of grid) {
    for (const node of row) {
      unNestedNodes.push(node);
    }
  }

  if (prevVisitedNodes.length) {
    for (const node of unNestedNodes) {
      let visited = false;

      for (const visitedNode of prevVisitedNodes) {
        if (node.row === visitedNode.row && node.col === visitedNode.col) {
          visited = true;
        }
      }

      if (!visited) unVisitedNodes.push(node);
    }
  } else {
    unVisitedNodes = unNestedNodes;
  }

	return unVisitedNodes;
}

// core dijkstra algorithm
export const dijkstra = (grid, startNode, finishNode, interNode, prevVisitedNodesInOrder) => {
  const visitedNodesInOrder = {
    firstRun: prevVisitedNodesInOrder,
    secondRun: [],
  };

  // if (prevVisitedNodesInOrder.length) {
  //   for (const node of prevVisitedNodesInOrder) {
  //     visitedNodesInOrder.push(node);
  //   }
  // }

	startNode.distance = 0;
  const unvisitedNodes = getUnvisitedNodes(grid, prevVisitedNodesInOrder.firstRun);
  
  if (interNode) {
    while (unvisitedNodes.length > 0) { // while there are still unvisited nodes...
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift() // remove the first node in the array (i.e. one of the neighbors)
  
      if (closestNode.isWall) continue;
  
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      // if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck
  
      closestNode.isVisited = true;
      visitedNodesInOrder.firstRun.push(closestNode);
  
      if(closestNode === interNode) {
        console.log(visitedNodesInOrder.firstRun);
        dijkstra(grid, interNode, finishNode, null, visitedNodesInOrder.firstRun); // intermediate node has been found
      }

      updateUnvisitedNeighbors(closestNode, grid);
    }
  } else {
    while (unvisitedNodes.length > 0) { // while there are still unvisited nodes...
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift() // remove the first node in the array (i.e. one of the neighbors)
  
      if (closestNode.isWall) continue;
  
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      // if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      if(closestNode === finishNode) {
        console.log(visitedNodesInOrder)
        return visitedNodesInOrder; // algorithm complete, finished node has been found
      }
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
}

// find the shortest path by starting at the end node and moving to node.previousNode
export const getShortestPathNodes = finishNode => {
  const path = [];
  
	let currentNode = finishNode;

  // path.unshift(currentNode);
	while (currentNode) {
    path.unshift(currentNode);
		currentNode = currentNode.previousNode; // once we reach the start node, this becomes null and the loop breaks
	}
	return path;
}

export const animateDijkstra = (visitedNodesInOrder, shortestPathNodes, setState) => {
	for (let i = 0; i <= visitedNodesInOrder.length; i++) { // once all nodes are animated, animate the shortest path
		const node = visitedNodesInOrder[i];

		if (i === visitedNodesInOrder.length) {
			setTimeout(() => {
				animateShortestPath(shortestPathNodes, setState);
			}, 10 * i)
		} else {
			setTimeout(() => {
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

export const animateShortestPath = (shortestPathNodes, setState) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i];
			document.getElementById(`node-${node.row}-${node.col}`).className += ' node-shortest-path';
			
    }, 50 * i);
		if (i === shortestPathNodes.length - 1) {
			setTimeout(() => {
				setState(prev => ({ ...prev, inProgress: 'DONE' }));
			}, 50 * i)
		}
  }
}

export default async function visualizeDijkstra(grid, startNode, finishNode, interNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const interNodeObj = interNode ? grid[interNode.row][interNode.col] : null;
  const visitedNodesInOrder = dijkstra(grid, startNodeObj, finishNodeObj, interNodeObj);
  console.log(visitedNodesInOrder)
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

	animateDijkstra(visitedNodesInOrder, shortestPathNodes, setState);
}