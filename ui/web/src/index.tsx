/** Application setup */
import './setup';

/** React imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/** React components */
// import App from './components/App';

/** Routes */
import Router from './routes';

// /** Integration */
// import './integration';

/** Main renderer */
ReactDOM.render(
  <React.StrictMode>{Router}</React.StrictMode>,
  document.getElementById('root')
);
