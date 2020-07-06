import React from 'react';
import '../styles/Description.css';

export default function Description() {
  return (
    <div className='Description'>
      <h2>Dijkstra's Algorithm</h2>
      <p>
      Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It picks the unvisited node with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.
      </p>
    </div>
  )
}