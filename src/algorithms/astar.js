import { getNeighborsQueue, heuristic, sortNodesByCost, checkOpenList } from './algorithmHelpers'

export default function astar(grid, start, end) {

  start.distanceToStart = 0;
  start.cost = heuristic(start, end);

  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes = sortNodesByCost(unVisitedNodes);

    const currentNode = unVisitedNodes.shift();    

    if (currentNode.col === end.col && currentNode.row === end.row) {
      visitedNodes.push(currentNode)
      return visitedNodes;
    }
    
    const neighbors = getNeighborsQueue(currentNode, grid);

    neighbors.forEach(neighbor => {

      const heuristicToEnd = heuristic(neighbor, end);

      if (!neighbor.isVisited && !neighbor.isWall) {

        neighbor.distanceToStart = currentNode.distanceToStart + 1;
        neighbor.heuristic = heuristicToEnd;
        neighbor.cost = neighbor.distanceToStart + neighbor.heuristic;

        if (neighbor.isWeight) {
          neighbor.cost += 25;
        }

        if (checkOpenList(unVisitedNodes, neighbor)) {
          unVisitedNodes.push(neighbor);
          neighbor.previousNode = currentNode;
        }
      }    
    })
    currentNode.isVisited = true;
    visitedNodes.push(currentNode); 
  }

  return visitedNodes;
};