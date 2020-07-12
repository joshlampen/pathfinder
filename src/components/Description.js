import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
// import { faBezierCurve } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../styles/Description.css';

export default function Description(props) {
  const [ desc, setDesc ] = useState({
    algName: "Dijkstra’s Algorithm",
    algDesc: "Dijkstra's algorithm is a path search algorithm that guarantees the shortest path. Beginning at the start node, the algorithm picks the unvisited node with the lowest distance (its neighbors), calculates the distance through that node to each of its unvisited neighbors, and so on, until the end node is reached. Dijkstra’s algorithm is weighted, meaning it can account for weighted nodes that require more ‘work’ to pass through (like traffic spots on a map)."
  })

  const { algorithm } = props;

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
    } else if (algorithm === 'A-STAR') {
      Promise.resolve(axios.get("/descriptions/4"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
        })
      }) 
    } else if (algorithm === 'GREEDY') {
      Promise.resolve(axios.get("/descriptions/5"))
      .then(response => {
        setDesc({
          algName: response.data.algorithm_name,
          algDesc: response.data.desc
        })
      }) 
    }
  }, [algorithm]);

  const mountIcon = () => {
    if (algorithm === 'BREADTH-FIRST' || algorithm === 'DEPTH-FIRST') {
      return <FontAwesomeIcon icon={faProjectDiagram} />
    } else {
      return <FontAwesomeIcon icon={faRoute} />
    }
  }
    
  return (
    <div className='Description'>
      <h2>{mountIcon()}&nbsp;&nbsp; {desc.algName}</h2>
      <p>
        {desc.algDesc}
      </p>
    </div>
  )
}