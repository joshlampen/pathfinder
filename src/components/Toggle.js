import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Toggle(props) {
  const { drawWall, toggleWeight } = props;

  return (
    <ToggleButtonGroup
      value={drawWall}
      size='small'
      exclusive
      onChange={toggleWeight}
    >
      <ToggleButton value={true}>&nbsp;&nbsp; Draw Wall &nbsp;&nbsp;</ToggleButton>
      <ToggleButton value={false}>&nbsp;Draw Weight&nbsp;</ToggleButton>
    </ToggleButtonGroup>
  )
}