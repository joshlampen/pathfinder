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
    for (const neighbor of neighbors) {

      const heuristicToNode = heuristic(neighbor, currentNode);
      const heuristicToEnd = heuristic(neighbor, end);

      // if (heuristic(neighbor, end) * 2 < rowColVector(neighbor, end)) {
      //   console.log('here')
      //   heuristicToEnd *= 2
      // }

      if (!neighbor.isVisited && !neighbor.isWall) {
        let currentDistance = currentNode.distanceToStart + heuristicToNode;
        let hasDuplicate = false;
        let betterPath = true;

        if (neighbor.isWeight) {
          currentDistance += 3
        }

        if (currentNode.col === 39 && currentNode.row === 0) {
          console.log(neighbor)
        }

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
          unVisitedNodes.push(neighbor);
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