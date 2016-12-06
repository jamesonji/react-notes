// src/routes.js
import React, {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Index from './components/Index'
import About from './components/About';
import NoteList from './components/NotesList';
import EditNote from './components/EditNote';
import LoginForm from './components/User/LoginForm';
import SignupForm from './components/User/SignupForm';
import NotFound from './components/NotFound';

class Routes extends Component{
render(){
    return(
      <Router history={ browserHistory }>
        <Route path="/" component={ App } >
          <IndexRoute component={ Index } />
          <Route path="/about" component={ About } />
          <Route path="/list" component={ NoteList } />
          <Route path="/edit/:id" component={ EditNote } />
          <Route path="/login" component={ LoginForm } />
          <Route path="/signup" component={ SignupForm } />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
    )
  }
}
export default Routes;