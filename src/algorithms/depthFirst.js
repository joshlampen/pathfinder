import { getNeighborsStack } from './algorithmHelpers';

export default function depthFirst(grid, start, end) {
  let stack = [start];
  let visitedNodes = [start];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode === end) {
      return visitedNodes;
    }

    const neighbors = getNeighborsStack(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    })
  }
  
  return visitedNodes;
}