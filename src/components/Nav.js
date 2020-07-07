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
        <a href='/' className="logo">
          Pathfinder
        </a>
        <span className='spacer'>&nbsp;</span>
        <span className='viewcount'>
          <Counter incrementCounter={incrementCounter} /> paths visualized
        </span>
      </section>
      <ul className='nav-buttons'>
        <button>Tutorial</button>
        <span className='spacer'>&nbsp;</span>
        <li>
          <Dropdown
            toggleAlgorithm={toggleAlgorithm}
          />
        </li>
      </ul>
    </nav>
  )
}