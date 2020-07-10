import { heuristic } from './astar';
import { getNeighborsBreadthFirst } from './breadthFirst';

export default function greedyBfs(grid, startNode, endNode) {

  let openSet = [startNode];
  let closedSet = [];

  while (openSet.length) {

    openSet.sort((nodeA, nodeB) => {
      if (nodeA.heuristic > nodeB.heuristic) return -1;
      if (nodeA.heuristic < nodeB.heuristic) return 1;
    });

    const currentNode = endNode;

    if (currentNode.col === end.col && currentNode.row === end.row) {
      closedSet.push(currentNode);
      return closedSet;
    }

    const neighbors = getNeighborsBreadthFirst(currentNode, grid);

    neighbors.forEach(neighbor => {

      const heuristicToEnd = heuristic(neighbor, endNode);

      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.heuristic = heuristicToEnd;
      }

      if (neighbor.isWeight) {
        neighbor.heuristic -= 3;
      }

      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      openSet.push(neighbor);
    })
  }
}