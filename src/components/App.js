import React, { useState } from 'react';
import Nav from './Nav';
import Description from './Description';
import Grid from './Grid';
import Legend from './Legend';
import Footer from './Footer';
import '../styles/App.css';

export default function App() {
  const [state, setState] = useState({
    algorithm: 'DIJKSTRA',
    incrementCounter: false,
    disableNav: false
  });
  
  const toggleAlgorithm = newAlgorithm => {
    const algorithm = newAlgorithm;
    
    setState(prev => ({ ...prev, algorithm }))
  }

  const toggleCounter = () => {
    const incrementCounter = !state.incrementCounter;

    setState(prev => ({ ...prev, incrementCounter }))
  }

  const toggleNavDisable = disable => {
    const disableNav = disable;

    setState(prev => ({ ...prev, disableNav }))
  }

  return (
    <div className="App">
      <Nav
        toggleAlgorithm={toggleAlgorithm}
        incrementCounter={state.incrementCounter}
        disableNav={state.disableNav}
      />
      <Description />
      <Grid
        algorithm={state.algorithm}
        toggleCounter={toggleCounter}
        toggleNavDisable={toggleNavDisable}
      />
      <Legend />
      <Footer />
    </div>
  );
}