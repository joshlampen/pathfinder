import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Dropdown(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const { toggleAlgorithm } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = algorithm => {
    toggleAlgorithm(algorithm);
    setAnchorEl(null);
  }

  return (
    <li>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Select Algorithm
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleToggle('DIJKSTRA')}>Dijkstra</MenuItem>
        <MenuItem onClick={() => handleToggle('DEPTH-FIRST')}>Depth First</MenuItem>
        <MenuItem onClick={() => handleToggle('BREADTH-FIRST')}>Breadth First</MenuItem>
      </Menu>
    </li>
  );
}