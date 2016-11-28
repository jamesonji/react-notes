import React, { Component } from 'react';
import MyEditor from '../editor/Editor';
import $ from 'jquery';
import './style.css'

const BASE_URL = 'http://localhost:3001';

class Index extends Component {
  constructor (props){
    super(props)
    this.state={
      text: "Please enter your notes",
    }
    this.initNote = this.initNote.bind(this);
  }
  
  initNote(){
    $.ajax({
      url:`${BASE_URL}`,
      success: function (note){
        this.setState({text: note.text})
        console.log(this.state.text);
      }.bind(this)
    })
  }
  
  componentDidMount(){
    this.initNote();
  }
  
  render() {
    return (
      <div className="Home-page">
        <h1>Index Page</h1>
        <MyEditor note={ this.state.text }/>
      </div>
    );
  }
}

export default Index;