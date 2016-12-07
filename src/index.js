import React from 'react';
// import Routes from './routes';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import rootReducer from './reducers/index'; 
import './index.css';

import App from './components/App';
import Index from './components/Index'
import About from './components/About';
import NoteList from './components/NotesList';
import EditNote from './components/EditNote';
import LoginForm from './components/User/LoginForm';
import SignupForm from './components/User/SignupForm';
import NotFound from './components/NotFound';

// Add the reducer to your store on the `routing` key
// const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
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
  </Provider>,
  document.getElementById('root')
);
