import { getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';

const manhattanDistance = (currentNode, endNode) => {
  //Used for heuristics
  differenceInCol = Math.abs(currentNode.col - endNode.col);
  differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {
  let unVisitedNodes = [];
  let visitedNodes = [];

  unVisitedNodes.push(start);

  while (unVisitedNodes.length) {

    unVisitedNodes.sort((nodeA, nodeB) => nodeA.cost - nodeB.cost);
    const currentNode = unVisitedNodes.shift();

    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

		if (currentNode.distance === Infinity) return visitedNodes;

    if (currentNode === endNode) return visitedNodes;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);

    neighbors.forEach(neighbor => {
      if (!visitedNodes.includes(currentNode) && !currentNode.isWall) {
        if (neighbour.isWeight) {
          neighbor.distance = currentNode.distance + 2;
        } else {
          neighbor.distance = currentNode.distance + 1
        }

        neighbor.heuristic = manhattanDistance(neighbor, end);
        neighbor.cost = neighbor.distance + neighbor.heuristic;

        unVisitedNodes.forEach(unVisitedNode => {
          if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost < neighbor.cost) {
            continue;
          }
          unVisitedNode.push(neighbor);
        })
      }
    })
  }
}