import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../styles/buttonTheme'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginRight: '10px',
    marginLeft: '5px'
  },
  select: {
    margin: '10px',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavDropdown(props) {
  const { inProgress } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleAlgToggle = algorithm => {
    setOpen(false);

    return;
  }

  const manageIconMount = () => {
    return open ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevOpen = useRef(open);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.root}
          size='small'
          color='secondary'
          variant='contained'
          disableElevation
          disabled={inProgress}
        >
          &nbsp;Load Map&nbsp;&nbsp;{manageIconMount()}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem 
                      className={classes.select}
                      onClick={() => handleAlgToggle('DIJKSTRA')}
                    >
                      Dijkstra
                    </MenuItem>
                    <MenuItem className={classes.select} onClick={() => handleAlgToggle('DEPTH-FIRST')}>Depth-First</MenuItem>
                    <MenuItem className={classes.select} onClick={() => handleAlgToggle('BREADTH-FIRST')}>Breadth-First</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </ThemeProvider>
  )
}