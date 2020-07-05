import React from 'react';
import Button from './Button';
import useGridData from '../hooks/useGridData';

export default function ToolBar() {
  const {
    startVisualization,
    resetGrid,
    toggleWeight
  } = useGridData();

  return (
    <section>
      <Button
        text='Visualize'
        onClick={startVisualization}
      />
      <Button
        text='Reset Grid'
        onClick={resetGrid}
      />
      <Button
        text='Draw Wall'
        onClick={toggleWeight}
        // selected={state.makeWall}
      />
      <Button
        text='Draw Weight'
        onClick={toggleWeight}
        // selected={state.makeWall}
      />
    </section>
  )
}