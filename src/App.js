import React, { Component } from 'react';
import Editor from './editor/Editor'
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
        <div className="App-main">
          <Editor />
        </div>
      </div>
    );
  }
}

export default App;
