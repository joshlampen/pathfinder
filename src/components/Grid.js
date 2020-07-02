import React, { useState } from 'react';
import Node from './Node';
import setInitialGrid from '../helpers/gridHelpers';
import '../styles/Grid.css';

// set grid equal to getInitialGrid() which is similar to what we have below but pushes nodes using createNode()
// createNode() returns objects with keys such as col, row, isStart, isFinish, distance, etc.
// within dijkstra:
//  initialize an empty array that contains visitedNodesInOrder
//  set startNode.distance = 0
//  set unvisitedNodes = grid array of all the nodes
//  while there are still nodes in the unvisitedNodes array...
//    sort the nodes in the array by distance
//    set closestNode = unvisitedNodes.shift() --> assigns next node in array while also removing from array for future
//    if closestNode.isWall then skip it (it's a wall)
//    if closestNode.distance === Infinity we're trapped and should stop
//    set closestNode.isVisited = true
//    push closestNode into the visitedNodesInOrder array
//    if closestNode === finishNode you're done --> return visitedNodesInOrder
//    at the end, upDateUnvisitedNeigbors
//      sets unvisitedNeigbors equal to getUnvisitedNeighbors
//        creates an empty neighbors array
//        based on the position of the node being passed into the function, the function pushes all adjacent nodes into the array
//        returns all items of the array, filtering by ifVisited is true
//      for each neighbor of the array...
//        change distance from Infinity to original node distance + 1
//        set previousNode to the original node

// const START_NODE_ROW = 7
// const START_NODE_COL = 5

// const FINISH_NODE_ROW = 7
// const FINISH_NODE_COL = 45

// // creates the nodes that are pushed into the grid array
// const createNode = (row, col) => {
//   const node = {
//     row,
//     col,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null
//   };

//   return node;
// }

// // create the initial array of node objects
// const setInitialGrid = () => {
//   const grid = [];
  
//   // for each row in the grid... 
//   for (let row = 0; row < 15; row++) {
//     const currentRow = [];

//     // for each column in the row...
//     for (let col = 0; col < 50; col++) {

//       // create node and push
//       currentRow.push(createNode(row, col));
//     }
  
//     grid.push(currentRow);
//   }

//   return grid;
// }

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const grid = setInitialGrid().map((row, rowIndex) => {
    return row.map((node, nodeIndex) => {
      return (
        <Node
          key={nodeIndex}
          isStart={node.isStart}
          isFinish={node.isFinish}
        />
      )
    })
  })

  return (
    <div className="Grid">
      {grid}
    </div>
  )
}