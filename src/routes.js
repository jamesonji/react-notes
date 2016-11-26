// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Index from './components/Index'
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    {/* use App.js ass a outer container, */}
    <Route path="/" component={ App } >
      <IndexRoute path="/" component={ Index } />
      <Route path="/about" component={ About } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);

export default Routes;