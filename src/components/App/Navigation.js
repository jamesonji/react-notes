import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';

class Navigation extends Component {
  render() {
    return (
      <div className="App-nav" >
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Notes</h2>
          <h3><Link to="/" activeClassName="active">Home</Link></h3>
          { this.props.authed?
            <div>
              <h3><Link to="/about" activeClassName="active">About</Link></h3>
              <h3><Link to="/list" activeClassName="active">List</Link></h3>
            </div> :
            ""
          }
      </div>
    );
  }
}

export default Navigation;


