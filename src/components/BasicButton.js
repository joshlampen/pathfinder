import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1167b1',
      dark: '#03254c',
      contrastText: '#fff'
    },
    secondary: {
      main: '#2a96f4',
      dark: '#187bcd',
      contrastText: '#fff'
    }
  }
})

const style = {
  marginRight: '10px',
  marginLeft: '10px'
}

export default function BasicButton(props) {
  const { text, onClick, size, color, inProgress } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        size={size}
        color={color}
        style={style}
        onClick={onClick}
        disableElevation
      >
        {text}
      </Button>
    </ThemeProvider>
  )
}