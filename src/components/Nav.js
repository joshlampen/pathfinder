import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';
import '../styles/Nav.css';
import Counter from './Counter'

export default function Nav() {
  return (
    <nav
      className="Nav"
    >
      <span className="logo">
        Pathfinder
      </span>
      <section className="viewcount">
        View Count: 
        <Counter/>
      </section>
      <ul className='nav-buttons'>
        <NavButton
          text='Tutorial'
        />
        <li><a href=''>Select Algorithm <FontAwesomeIcon icon={faSortDown} className='nav-icon'/></a></li>
      </ul>
    </nav>
  )
}