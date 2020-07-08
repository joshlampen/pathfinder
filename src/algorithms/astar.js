import { getShortestPathNodes, animateDijkstra, getUnvisitedNeighbors } from './dijkstra';
import { getNeighborsBreadthFirst } from './breadthFirst'

const heuristic = (currentNode, endNode) => {

  const differenceInCol = Math.abs(currentNode.col - endNode.col);
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
      // if (nodeA.heuristic > nodeB.heuristic) return 1;
      // if (nodeA.heuristic < nodeB.heuristic) return -1;
      // if (nodeA.distanceToStart > nodeB.distanceToStart) return 1;
      // if (nodeA.distanceToStart < nodeB.distanceToStart) return -1;
    });

    const currentNode = unVisitedNodes.shift();    

    if (currentNode.col === end.col && currentNode.row === end.row) {
      visitedNodes.push(currentNode)
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);

    for (const neighbor of neighbors) {

      const heuristicToEnd = heuristic(neighbor, end);

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
      console.log('heuristic', heuristicToEnd);
      console.log('cost', neighbor.cost)
    }     
    currentNode.isVisited = true;    
    visitedNodes.push(currentNode); 
  }
  return visitedNodes
}

export default async function visualizeAstar(grid, startNode, finishNode, interNode, setState) {
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

  const firstVisitedNodesInOrder = interNode ? astar(firstGrid, startNodeObj, firstInterNodeObj) : astar(firstGrid, startNodeObj, finishNodeObj);
  const secondVisitedNodesInOrder = interNode ? astar(secondGrid, secondInterNodeObj, finishNodeObj) : null

  const firstShortestPathNodes = interNode ? getShortestPathNodes(startNodeObj, firstInterNodeObj) : getShortestPathNodes(startNodeObj, finishNodeObj);
  const secondShortestPathNodes = interNode ? getShortestPathNodes(secondInterNodeObj, finishNodeObj) : null;

  animateDijkstra(firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState);
}