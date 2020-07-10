import { heuristic } from './astar';
import { getNeighborsBreadthFirst } from './breadthFirst';

export default function greedyBfs(grid, startNode, endNode) {

  let openSet = [startNode];
  let closedSet = [];

  startNode.heuristic = heuristic(startNode, endNode);
  startNode.isVisited = true;

  while (openSet.length) {

    openSet.sort((nodeA, nodeB) => {
      if (nodeA.heuristic > nodeB.heuristic) return 1;
      if (nodeA.heuristic < nodeB.heuristic) return -1;
    });

    const currentNode = openSet.shift();

    if (currentNode.col === endNode.col && currentNode.row === endNode.row) {
      closedSet.push(currentNode);
      return closedSet;
    }

    const neighbors = getNeighborsBreadthFirst(currentNode, grid);
    
    neighbors.forEach(neighbor => {

      console.log(endNode)

      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.heuristic = heuristic(neighbor, endNode);

        if (neighbor.isWeight) {
          neighbor.heuristic += 3;
        }

        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        openSet.push(neighbor);

      }
    })
    closedSet.push(currentNode);
  }
  return closedSet;
}