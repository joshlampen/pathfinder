import { getShortestPathNodes, animateDijkstra, getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';
import { getNeighborsBreadthFirst } from './breadthFirst'

const manhattanDistance = (currentNode, endNode) => {
  //Used for heuristics
  const differenceInCol = Math.abs(currentNode.col - endNode.col);
  const differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow
}

export const astar = (grid, start, end) => {
  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes.sort((nodeA, nodeB) => nodeA.cost - nodeB.cost);

    const currentNode = unVisitedNodes.shift();

    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode.col === end.col && currentNode.row === end.row) {
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);
    neighbors.forEach(neighbor => {

      neighbor.heuristic = manhattanDistance(neighbor, end);

      if (!neighbor.isVisited && !neighbor.isWall) {
        if (neighbor.isWeight) {
          neighbor.cost = currentNode.distanceToStart + neighbor.heuristic + 3;
        } else {
          neighbor.cost = currentNode.distanceToStart + neighbor.heuristic + 1;
        }

        neighbor.previousNode = currentNode;

        if (!unVisitedNodes.length) {
          unVisitedNodes.push(neighbor)
        } else {
          let hasMatch = false;
          for (let i = 0; i < unVisitedNodes.length; i++) {
            const unVisitedNode = unVisitedNodes[i];

            if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost > neighbor.cost) {
              // unVisitedNode = neighbor;
              unVisitedNodes.push(neighbor)
              hasMatch = true;

            } else if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost <= neighbor.cost) {
              hasMatch = true;
            }
          }

          if (!hasMatch) {
            unVisitedNodes.push(neighbor)
          }          
        }
      }
    })
  }
  return visitedNodes
}

export default async function visualizeAstar(grid, startNode, finishNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = astar(grid, startNodeObj, finishNodeObj);
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

	animateDijkstra(visitedNodesInOrder, shortestPathNodes, setState);
}