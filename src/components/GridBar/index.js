import React from 'react';
import Legend from './Legend';
import ToolBar from './ToolBar';
import '../../styles/GridBar.css';

export default function GridBar() {
  return (
    <div className="GridBar">
      <ToolBar />
      <Legend />
    </div>
  )
}