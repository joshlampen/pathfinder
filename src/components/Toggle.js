import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Toggle(props) {
  const [alignment, setAlignment] = useState(true);
  
  const { drawWall, toggleWeight, inProgress, algorithm } = props;

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      toggleWeight();
    }
  };

  return (
    <ToggleButtonGroup
      value={drawWall}
      size='small'
      exclusive
      onChange={handleAlignment}
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