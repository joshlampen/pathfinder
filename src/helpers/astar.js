import { getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';

const manhattanDistance = (currentNode, endNode) => {
  //Used for heuristics
  const differenceInCol = Math.abs(currentNode.col - endNode.col);
  const differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {
  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes.sort((nodeA, nodeB) => nodeA.cost - nodeB.cost);

    const currentNode = unVisitedNodes.shift();

    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode.col === end.col && currentNode.row === end.row) return visitedNodes;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);

    neighbors.forEach(neighbor => {
      currentNode.distance = 0;
      if (!neighbor.isVisited && !neighbor.isWall) {
        if (neighbor.isWeight) {
          neighbor.distance = currentNode.distance + 2;
        } else {
          neighbor.distance = currentNode.distance + 1
        }

        neighbor.heuristic = manhattanDistance(neighbor, end);
        neighbor.cost = neighbor.distance + neighbor.heuristic;

        if (!unVisitedNodes.length) {
          unVisitedNodes.push(neighbor)
        } else {
          unVisitedNodes.forEach(unVisitedNode => {
            if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost < neighbor.cost) {
              return;
            }
            unVisitedNodes.push(neighbor)
          })
        }
      }
    })
  }
  return visitedNodes;
}