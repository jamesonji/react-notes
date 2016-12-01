// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Index from './components/Index'
import About from './components/About';
import Notes from './components/Notes';
import LoginForm from './components/User/LoginForm';
import SignupForm from './components/User/SignupForm';
import NotFound from './components/NotFound';

const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ Index } />
      <Route path="/about" component={ About } />
      <Route path="/notes" component={ Notes } />
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ SignupForm } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);

export default Routes;