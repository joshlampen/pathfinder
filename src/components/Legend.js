import React from 'react';
import '../styles/Legend.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export default function Legend() {
  return (
    <section
      className='Legend'
    >
      <section className='legend-item'>
        <section className='Node'></section>
        <p>Unvisited</p>
      </section>
      
      <section className='legend-item'>
        <section className='Node node-visited'></section>
        <p>Visited</p>
      </section>

      <section className='legend-item'>
        <section className='Node node-shortest-path'></section>
        <p>Shortest Path</p>
      </section>

      <section className='legend-item'>
        <section className='Node node-wall'></section>
        <p>Wall</p>
      </section>

      <section className='legend-item'>
        <FontAwesomeIcon icon={faWeightHanging} />
        <p>Weight</p>
      </section>
    </section>
  )
}