import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Toggle(props) {
  const { drawWall, toggleWeight, inProgress, algorithm } = props;

  return (
    <ToggleButtonGroup
      value={drawWall}
      size='small'
      exclusive
      onChange={toggleWeight}
    >
      <ToggleButton
        value={true}
        disabled={inProgress}
        >
        &nbsp;&nbsp; Draw Wall &nbsp;&nbsp;
      </ToggleButton>

      <ToggleButton
        value={false}
        disabled={inProgress || (algorithm === 'DEPTH-FIRST' || algorithm === 'BREADTH-FIRST')}
      >
        &nbsp;Draw Weight&nbsp;
      </ToggleButton>
    </ToggleButtonGroup>
  )
}