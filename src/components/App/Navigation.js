import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';

class Navigation extends Component {
  render() {
    return (
      <div className="App-nav">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Notes</h2>
        <ul>
          <li><Link to="/" activeClassName="active">Home</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;


