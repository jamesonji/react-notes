import React, { Component } from 'react';
import Navigation from './Navigation';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
