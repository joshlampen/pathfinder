import { getNeighborsQueue } from './algorithmHelpers';

export default function breadthFirst(grid, start, end) {
  let queue = [start];
  let visitedNodes = [start];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === end) {
      return visitedNodes;
    }
    
    const neighbors = getNeighborsQueue(currentNode, grid);
    
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