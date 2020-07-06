import React from 'react';
import '../styles/Nav.css';
import Counter from './Counter'

export default function Nav() {
  return (
    <nav
      className="Nav"
    >
      <section className="logo">
        Pathfinder
      </section>
      <section className="viewcount">
        View Count: 
        <Counter/>
      </section>

    </nav>
  )
}