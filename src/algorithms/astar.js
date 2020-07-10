import { getNeighborsBreadthFirst } from './breadthFirst'

export const heuristic = (currentNode, endNode) => {

  const differenceInCol = Math.pow(currentNode.col - endNode.col, 2);
  const differenceInRow = Math.pow(currentNode.row - endNode.row, 2);
  return Math.sqrt(differenceInCol + differenceInRow);
}

export default function astar(grid, start, end) {

  start.distanceToStart = 0;
  start.cost = heuristic(start, end);

  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes = unVisitedNodes.sort((nodeA, nodeB) => {
      if (nodeA.cost > nodeB.cost) return 1;
      if (nodeA.cost < nodeB.cost) return -1;
      if (nodeA.cost === nodeB.cost) {

        const p = 1 / (46 * 16);

        nodeA.cost = nodeA.distanceToStart + nodeA.heuristic * (1.0 + p);
        nodeB.cost = nodeB.distanceToStart + nodeB.heuristic * (1.0 + p);

        if (nodeA.cost > nodeB.cost) return 1;
        if (nodeA.cost < nodeB.cost) return -1;
     }
    });

    const currentNode = unVisitedNodes.shift();    

    if (currentNode.col === end.col && currentNode.row === end.row) {
      visitedNodes.push(currentNode)
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);

    for (const neighbor of neighbors) {

      const heuristicToEnd = heuristic(neighbor, end);

      if (!neighbor.isVisited && !neighbor.isWall) {

        neighbor.distanceToStart = currentNode.distanceToStart + 1;
        neighbor.heuristic = heuristicToEnd;
        neighbor.cost = neighbor.distanceToStart + neighbor.heuristic;

        if (neighbor.isWeight) {
          neighbor.cost += 3;
        }

        let better = true;
        unVisitedNodes.forEach(node => {
          if (node.row === neighbor.row && node.col === neighbor.col) {
            if (neighbor.cost >= node.cost) {
              better = false;
            } else {
              better = true
            }
          }
        })

        if (better) {
          unVisitedNodes.push(neighbor);
          neighbor.previousNode = currentNode;
        }
      }
    }     
    currentNode.isVisited = true;
    visitedNodes.push(currentNode); 
  }
  return visitedNodes
}