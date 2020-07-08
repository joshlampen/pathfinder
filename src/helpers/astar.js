import { getShortestPathNodes, animateDijkstra, getUnvisitedNeighbors } from '../helpers/dijkstraHelpers';
import { getNeighborsBreadthFirst } from './breadthFirst'

const heuristic = (currentNode, endNode) => {

  const differenceInCol = Math.abs(currentNode.col - endNode.col)
  const differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {

  start.distanceToStart = 0;
  start.cost = heuristic(start, end);

  let unVisitedNodes = [start];
  let visitedNodes = [];

  while (unVisitedNodes.length) {

    unVisitedNodes = unVisitedNodes.sort((nodeA, nodeB) => {
      if (nodeA.cost > nodeB.cost) return 1;
      if (nodeA.cost < nodeB.cost) return -1;
      if (nodeA.heuristic > nodeB.heuristic) return 1;
      if (nodeA.heuristic < nodeB.heuristic) return -1;
    });

    const currentNode = unVisitedNodes.shift();    

    if (currentNode.col === end.col && currentNode.row === end.row) {
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);

    for (const neighbor of neighbors) {

      const heuristicToEnd = heuristic(neighbor, end);
      console.log(heuristicToEnd)

      if (!neighbor.isVisited && !neighbor.isWall) {

        neighbor.distanceToStart = currentNode.distanceToStart + 1;
        neighbor.heuristic = heuristicToEnd;
        neighbor.cost = neighbor.distanceToStart + neighbor.heuristic;

        if (neighbor.isWeight) {
          neighbor.cost += 2;
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

export default async function visualizeAstar(grid, startNode, finishNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = astar(grid, startNodeObj, finishNodeObj);
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

	animateDijkstra(visitedNodesInOrder, shortestPathNodes, setState);
}