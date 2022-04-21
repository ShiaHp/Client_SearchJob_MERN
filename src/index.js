import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import {AppProvider} from './context/appContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App date = {Date.now()} />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


