import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../styles/Description.css';

export default function Description(props) {
  const [ desc, setDesc ] = useState({
    algName: "Dijkstra's",
    algDesc: "Dijkstra’s algorithm finds the shortest path between two nodes on a graph. It has several real-world applications, including its implementation in Google Maps and Apple Maps.\nBeginning at the start node, the algorithm picks the unvisited node with the lowest distance (its neighbors), calculates the distance through that node to each of its unvisited neighbors, and so on, until the end node is reached.\nUnlike the bread-first search algorithm, Dijkstra’s algorithm can account for weighted nodes that require more ‘work’ to pass through (picture traffic spots on a map)."
  })

  const { algorithm } = props

  useEffect(() => { 
    if (algorithm === 'DIJKSTRA') {
    Promise.resolve(axios.get("/descriptions/7"))
      .then(response => {
        setDesc({
        algName: response.data.algorithm_name,
        algDesc: response.data.desc
        })
      }) 
    } else if (algorithm === 'DEPTH-FIRST') {
      Promise.resolve(axios.get("/descriptions/8"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
          })
      }) 
    } else if (algorithm === 'BREADTH-FIRST') {
      Promise.resolve(axios.get("/descriptions/9"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
          })
      }) 
    }}, [algorithm]);

  return (
    <div className='Description'>
      <h2><FontAwesomeIcon icon={faWaveSquare} />&nbsp;&nbsp; {desc.algName}</h2>
      <p>
        {desc.algDesc}
      </p>
    </div>
  )
}