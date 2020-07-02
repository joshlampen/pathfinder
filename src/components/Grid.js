import React, { useState } from 'react';
import Node from './Node';
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


export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const initGrid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      const currentNode = {
        row,
        col,
        isStart: row === 7 && col === 5,
        isFinish: row === 7 && col === 45
      }

      currentRow.push(currentNode);
    }

    initGrid.push(currentRow)
  }

  const grid = initGrid.map((row, rowIndex) => {
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