import React from 'react';
import visualizeAlgorithm from '../algorithms/algorithmHelpers';

export default function Steps(props) {

  const { stage } = props;

  return (
    <>
      {stage === 1 && <h1>Step 1</h1>}
      {stage === 2 && <h1>Step 2</h1>}
    </>
  )
}

// 1st step: choose algo
// 2nd step: nodes & intermediate nodes
// 3rd stage: walls and weights;
// 4th stage: premade maze
// 5th stage: visualize
// 6th stage: reset