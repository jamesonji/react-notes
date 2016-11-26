import React, { Component } from 'react';
import Editor from '../editor/Editor';
import './style.css'

class Index extends Component {
  render() {
    return (
      <div className="Home-page">
        <h1>Index Page</h1>
        <Editor />
      </div>
    );
  }
}

export default Index;
