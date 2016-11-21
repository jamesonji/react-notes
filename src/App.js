import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Notes</h2>
        </div>
        <p className="App-main">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
