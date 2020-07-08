import { getShortestPathNodes, animateDijkstra, getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';
import { getNeighborsBreadthFirst } from './breadthFirst'

const heuristic = (currentNode, endNode) => {
  //Used for heuristics

  // const differenceInCol = (currentNode.col - endNode.col) ** 2;
  // const differenceInRow = (currentNode.row = endNode.row) ** 2;
  // return Math.floor((differenceInCol + differenceInRow) ** 0.5);

  const differenceInCol = Math.abs(currentNode.col - endNode.col)
  const differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {

  start.cost = start.heuristic = start.distanceToStart = 0;
  end.cost = end.heuristic = end.distanceToStart = 0;

  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes.sort((nodeA, nodeB) => nodeA.cost - nodeB.cost);

    const currentNode = unVisitedNodes.shift();

    currentNode.isVisited = true;    

    visitedNodes.push(currentNode);

    if (currentNode.col === end.col && currentNode.row === end.row) {
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);
    for (const neighbor of neighbors) {

      const heuristicToEnd = heuristic(neighbor, end);

      if (!neighbor.isVisited && !neighbor.isWall) {
        let currentDistance = currentNode.distanceToStart + 1 
        let hasDuplicate = false;
        let betterPath = true;

        console.log(currentDistance)

        unVisitedNodes.forEach(node => {
          if (node.row === neighbor.row && node.col === neighbor.col) {
            if (currentDistance < neighbor.distanceToStart) {
              neighbor.distanceToStart = currentDistance;
              hasDuplicate = true;
            } else {
              hasDuplicate = true;
              betterPath = false;
            }
          } 
        })

        if (betterPath) {
          neighbor.heuristic = heuristicToEnd;
          neighbor.cost = neighbor.distanceToStart + neighbor.heuristic;
          neighbor.previousNode = currentNode;
        }

        if (!hasDuplicate) {
          neighbor.distanceToStart = currentDistance;
          console.log(currentDistance);
          unVisitedNodes.push(neighbor);
        }

        if (neighbor.isWeight) {
          neighbor.cost += 2
        }
      }
    }
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