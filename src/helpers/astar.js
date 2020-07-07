import { getShortestPathNodes, animateDijkstra, getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';
import { getNeighborsBreadthFirst } from './breadthFirst'

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
    console.log(unVisitedNodes.length)

    const currentNode = unVisitedNodes.shift();

    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode.col === end.col && currentNode.row === end.row) {
      return visitedNodes;
    }

    const neighbors = getNeighborsBreadthFirst(currentNode, grid);

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
        neighbor.previousNode = currentNode

        if (!unVisitedNodes.length) {
          unVisitedNodes.push(neighbor)
        } else {
          unVisitedNodes.forEach((unVisitedNode, idx) => {
            if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost <= neighbor.cost) {
              return;
            }

            //if (unVisitedNode.col === neighbor.col && unVisitedNode.row === neighbor.row && unVisitedNode.cost > neighbor.cost) {
              unVisitedNodes.push(neighbor);
            // }

          })
        }
      }
    })
  }
  return visitedNodes;
}

export default async function visualizeAstar(grid, startNode, finishNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = astar(grid, startNodeObj, finishNodeObj);
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

	animateDijkstra(visitedNodesInOrder, shortestPathNodes, setState);
}