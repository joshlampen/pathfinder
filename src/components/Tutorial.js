import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Stage1 from "./Tutorial/Step1";
import Stage2 from "./Tutorial/Step2";
import Stage3 from "./Tutorial/Step3";
import Stage4 from "./Tutorial/Step4";
import Stage5 from "./Tutorial/Step5";
import Stage6 from "./Tutorial/Step6";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function TutorialDialog(props) {
  
  const [state, setState] = useState({
    stage: 1
  })

  const classes = useStyles();
  const { tutorialMode, handleClose } = props;

  const changeStage = () => {
    const stage = state.stage + 1;
    setState(prev => ({ ...prev, stage }))
  }

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={tutorialMode}>
      <DialogTitle id="simple-dialog-title">Tutorial</DialogTitle>

      {state.stage === 1 && <Stage1 />}
      {state.stage === 2 && <Stage2 />}
      {state.stage === 3 && <Stage3 />}
      {state.stage === 4 && <Stage4 />}
      {state.stage === 5 && <Stage5 />}
      {state.stage === 6 && <Stage6 />}

      <Button onClick={changeStage} >
       Click! 
       </Button>
    </Dialog>
  );
}
