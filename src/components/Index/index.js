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
      type:"GET",
      success: function (data){
        console.log(data)
        this.setState({text: data.text})
      }.bind(this)
    })
  }
  
  componentDidMount(){
    this.initNote();
  }
  
  render() {
    return (
      <div className="Home-page">
        <div className="">
          <MyEditor editView={false}/>
        </div>
      </div>
    );
  }
}

export default Index;
