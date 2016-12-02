import React, { Component } from 'react';
import MyEditor from '../editor/Editor.js';
import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001';

export default class EditNote extends Component{
  constructor(props){
    super(props);
    this.state = { 
      note_id: '',
      title: '',
      note: '',
    }
    this.getNote = this.getNote.bind(this);
    this.initNote = this.initNote.bind(this);
  }
  
  componentWillMount(){
    this.setState({
      note_id: this.props.params.id,
    })
  }
  
  componentDidMount(){
    console.log(this.props.params.id);
    this.getNote();
  }
  
  getNote(){
    console.log(this.state.note_id);
    $.ajax({
      url:`${BASE_URL}/notes/${this.state.note_id}`,
      success: function (data){
        this.initNote(data);
      }.bind(this)
    })
  }
  
  initNote(data){
    this.setState({
      title: data.note.title,
      note: data.note.content,
    })
  }
  
  render (){
    return (
      <div className="Edite-Note">  
        <button onClick={ this.handleDelete }> Delete </button>
        <button> New </button>
        <MyEditor 
          note_id={ this.state.note_id }
          title={this.state.title}
          note={ this.state.note }
         />
      </div>
    )
  }
}

EditNote.defaultProps = {
  notes: [],
}
