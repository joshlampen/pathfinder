import React from 'react';
import Dropdown from './Dropdown';
import Counter from './Counter'
import '../styles/Nav.css';

export default function Nav(props) {
  const { toggleAlgorithm, incrementCounter } = props;

  return (
    <nav
      className="Nav"
    >
      <section>
        <span className="logo">
          Pathfinder
        </span>
        <span className='spacer'>&nbsp;</span>
        <span className='viewcount'>
          <Counter incrementCounter={incrementCounter} /> algorithms visualized
        </span>
      </section>
      <ul className='nav-buttons'>
        <button>Tutorial</button>
        <Dropdown
          toggleAlgorithm={toggleAlgorithm}
        />
      </ul>
    </nav>
  )
}