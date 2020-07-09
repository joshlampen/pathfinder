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
import Stage1 from "./Tutorial/Stage1";
import Stage2 from "./Tutorial/Stage2";
import Stage3 from "./Tutorial/Stage3";
import Stage4 from "./Tutorial/Stage4";
import Stage5 from "./Tutorial/Stage5";
import Stage6 from "./Tutorial/Stage6";
import '../styles/Tutorials.css'


export default function TutorialDialog(props) {
  
  const [state, setState] = useState({
    stage: 1
  })

  // const classes = useStyles();
  const { tutorialMode, handleClose } = props;

  const changeStage = () => {
    if (state.stage < 7) {
      let stage = state.stage + 1;
      setState(prev => ({ ...prev, stage }))      
    } else {
      let stage = 0
      setState(prev => ({...prev, stage}))
    }

  }

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={tutorialMode}>
      {/* {//<DialogTitle id="simple-dialog-title">Tutorial</DialogTitle>} */}

      <div className='tutorial'>
        {state.stage === 1 && <Stage1 />}     
        {state.stage === 2 && <Stage2 />}        
        {state.stage === 3 && <Stage3 />}        
        {state.stage === 4 && <Stage4 />}        
        {state.stage === 5 && <Stage5 />}     
        {state.stage === 6 && <Stage6 />}
      </div>

      {state.stage < 6 && <Button onClick={changeStage} >
        Click!
       </Button>}
      
      {state.stage === 6 && <Button onClick={handleClose}>
        Click to start!
      </Button>}

    </Dialog>
  );
}
