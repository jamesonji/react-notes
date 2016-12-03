import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
