import React, { Component } from 'react';
import Navigation from './Navigation';
import $ from 'jquery';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.logOut = this.logOut.bind(this);
  }
  
  logOut(){
    $.get({
      url: 'http://localhost:3001/logout',
      success: function(data){
        console.log(data);
      }
    })
  }
  
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-main">
          <button onClick={this.logOut}> LogOut</button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
