import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Description.css';

export default function Description(props) {
  const [ desc, setDesc ] = useState(
    {
      algName: "Dijkstra's Algorithm",
      algDesc: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It picks the unvisited node with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller."
    }
  )
  const { algorithm } = props

  useEffect(() => { 
    if (algorithm === 'DIJKSTRA') {
    Promise.resolve(axios.get("/descriptions/1"))
      .then(response => {
        setDesc({
        algName: response.data.algorithm_name,
        algDesc: response.data.desc
        })
      }) 
    } else if (algorithm === 'DEPTH-FIRST') {
      Promise.resolve(axios.get("/descriptions/2"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
          })
      }) 
    } else if (algorithm === 'BREADTH-FIRST') {
      Promise.resolve(axios.get("/descriptions/3"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
          })
      }) 
    }}, [algorithm]);

  return (
    <div className='Description'>
      <h2>{`${desc.algName} Algorithm`}</h2>
      <p>
        {desc.algDesc}
      </p>
    </div>
  )
}