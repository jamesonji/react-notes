import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main/App';
import Routes from './routes';
import { browserHistory } from 'react-router';

import './index.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
