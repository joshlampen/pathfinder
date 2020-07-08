import { getShortestPathNodes } from './dijkstra'
import { animateBreadthFirst } from './breadthFirst';

export const getNeighborsDfs = (node, grid) => {
  const neighbors = [];

  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.unshift(grid[row - 1][col]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.unshift(grid[row][col + 1]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.unshift(grid[row + 1][col]);
  }
  
  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.unshift(grid[row][col - 1])
  }
  return neighbors;
}

export const depthFirst = (grid, start, end) => {
  let stack = [start];
  let visitedNodes = [start];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode === end) {
      return visitedNodes;
    }

    const neighbors = getNeighborsDfs(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    })
  }
  return visitedNodes;
}

export default function visualizeDepthFirst(grid, startNode, finishNode, interNode, setState) {
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

  const firstVisitedNodesInOrder = interNode ? depthFirst(firstGrid, startNodeObj, firstInterNodeObj) : depthFirst(firstGrid, startNodeObj, finishNodeObj);
  const secondVisitedNodesInOrder = interNode ? depthFirst(secondGrid, secondInterNodeObj, finishNodeObj) : null

  const firstShortestPathNodes = interNode ? getShortestPathNodes(startNodeObj, firstInterNodeObj) : getShortestPathNodes(startNodeObj, finishNodeObj);
  const secondShortestPathNodes = interNode ? getShortestPathNodes(secondInterNodeObj, finishNodeObj) : null;

  animateBreadthFirst(firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState);
}