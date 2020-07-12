import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import './styles/index.css';
import App from './components/App';
import axios from "axios";
// import * as serviceWorker from '/serviceWorker';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <ActionCableProvider url={'ws://localhost:5000/cable'}> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ActionCableProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
