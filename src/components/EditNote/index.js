import React, { Component } from 'react';
import MyEditor from '../editor/Editor.js';
import { firebaseAuth } from '../../config/constants';
import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001/note';

export default class EditNote extends Component{
  constructor(props){
    super(props);
    this.state = { 
      note_id: '',
      title: '',
      note: '',
      readOnly: false,
    }
  }
  
  componentWillMount(){
    this.setState({
      note_id: this.props.params.id,
    })
  }
  
  componentDidMount(){
    this.getNote();
  }
  
  getNote = () =>{
    console.log(this.state.note_id);
    $.ajax({
      url:`${BASE_URL}/${this.state.note_id}`,
      type:'GET',
      success: function (data){
        this.initNote(data);
      }.bind(this)
    })
  }
  
  initNote = (data) =>{
    const user = firebaseAuth().currentUser; 
    if (!user || (user.email !== data.note.author)){
      this.setState({
        readOnly: true,
      })
    }
    this.setState({
      title: data.note.title,
      note: data.note.content,
    })
  }
  
  render (){
    return (
      <div className="Edite-Note">  
        <MyEditor 
          note_id={ this.state.note_id }
          title={this.state.title}
          note={ this.state.note }
          editView={true}
          readOnly={this.state.readOnly}
          theme={this.props.theme}
         />
      </div>
    )
  }
}

