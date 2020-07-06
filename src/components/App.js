import React, { useState } from 'react';
import Nav from './Nav';
import Description from './Description';
import Grid from './Grid';
import Legend from './Legend';
import '../styles/App.css';


export default function App() {
  const [state, setState] = useState({
    algorithm: 'DIJKSTRA',
    incrementCounter: false,
  });
  
  const toggleAlgorithm = newAlgorithm => {
    const algorithm = newAlgorithm;
    
    setState(prev => ({ ...prev, algorithm }))
  }

  const toggleCounter = () => {
    const incrementCounter = !state.incrementCounter

    setState(prev => ({ ...prev, incrementCounter }))
  }

  return (
    <div className="App">
      <Nav
        toggleAlgorithm={toggleAlgorithm}
        incrementCounter={state.incrementCounter}
      />
      <Description />
      <Grid
        algorithm={state.algorithm}
        inProgress={state.inProgress}
        toggleCounter={toggleCounter}
      />
      <Legend />
    </div>
  );
}