import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Stage1 from "./Tutorial/Stage1";
import Stage2 from "./Tutorial/Stage2";
import Stage3 from "./Tutorial/Stage3";
import Stage4 from "./Tutorial/Stage4";
import Stage5 from "./Tutorial/Stage5";
import Stage6 from "./Tutorial/Stage6";
import "../styles/TutorialDialog.css";

export default function TutorialDialog(props) {
  const [state, setState] = useState({
    stage: 1,
  });

  const { tutorialMode, handleClose } = props;

  const nextStage = () => {
    if (state.stage < 7) {
      let stage = state.stage + 1;
      setState((prev) => ({ ...prev, stage }));
    } else {
      let stage = 0;
      setState((prev) => ({ ...prev, stage }));
    }
  };
  
  const prevStage = () => {
    if (state.stage < 7) {
      let stage = state.stage - 1;
      setState((prev) => ({ ...prev, stage }));
    } else {
      let stage = 0;
      setState((prev) => ({ ...prev, stage }));
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={tutorialMode}
    >
      <div className="tutorial">
        {state.stage === 1 && <Stage1 />}
        {state.stage === 2 && <Stage2 />}
        {state.stage === 3 && <Stage3 />}
        {state.stage === 4 && <Stage4 />}
        {state.stage === 5 && <Stage5 />}
        {state.stage === 6 && <Stage6 />}

        {state.stage === 1 && (
          <div className='tutorial-buttons'>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={prevStage}
              disableElevation
              disabled
            >
              Prev
            </Button>
            <section>
              {state.stage} / 6
            </section>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={nextStage}
              disableElevation
            >
              Next
            </Button>
          </div>
        )}

        {state.stage < 6 && state.stage > 1 && (
          <div className='tutorial-buttons'>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={prevStage}
              disableElevation
            >
              Prev
            </Button>
            <section>
              {state.stage} / 6
            </section>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={nextStage}
              disableElevation
            >
              Next
            </Button>
          </div>
        )}

        {state.stage === 6 && (
          <div className='tutorial-buttons'>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={prevStage}
              disableElevation
            >
              Prev
            </Button>
            <section>
              {state.stage} / 6
            </section>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={handleClose}
              disableElevation
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
