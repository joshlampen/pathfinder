import React from 'react';
import Nav from './Nav';
import GridBar from './GridBar';
import Grid from './Grid';
import '../styles/App.css';

export default function App() {
  return (
    <div className="App">
      <Nav />
      <GridBar />
      <Grid />
    </div>
  );
}