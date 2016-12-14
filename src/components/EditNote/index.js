import React, { Component } from 'react';
import MyEditor from '../editor/Editor.js';
import { firebaseAuth } from '../../config/constants';
import $ from 'jquery';
import './style.css';

// const BASE_URL = 'http://localhost:3001/note';
const BASE_URL = 'https://reactnotesserver.herokuapp.com/note';

export default class EditNote extends Component{
  constructor(props){
    super(props);
    
    this.state = { 
      note_id: props.params.id,
      title: '',
      note: '',
      readOnly: false,
    }
  }
  
  componentWillMount(){
  }
  
  componentDidMount(){
    console.log('Mounted EditNote')
    this.getNote();
  }
  
  componentWillUnmount () {
    console.log('Unmounted EditNote!')
  }
  
  getNote = () =>{
    $.ajax({
      url:`${BASE_URL}/${this.props.params.id}`,
      type:'GET',
      success: function (data){
        this.initNote(data);
      }.bind(this)
    })
  }
  
  initNote = (data) =>{
    const user = firebaseAuth().currentUser; 
    console.log('Current User: ' + user);
    if (!user || (user.email !== data.note.author)){
      console.log('initNote user: '+ user);
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

