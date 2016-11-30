import React, {Component} from 'react';
import MyEditor from '../editor/Editor.js';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001';

export default class EditNote extends Component {
  constructor(props){
    super(props)
    this.state = { 
      note_id: '',
      title: '',
      note: '',
    }
    this.initNote = this.initNote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  
  initNote(){
    this.setState({       
          note_id: this.props.note_id,
          title: this.props.title,
          note: this.props.note,
        })
  }
  
  handleDelete(){
    $.ajax({
      url:`${BASE_URL}/notes/${this.state.note_id}`,
      type:'DELETE',
      success: this.handleBackClick()
    })
  }
  
  handleBackClick(){
    console.log('Clicked back button');
    console.log(this);
    this.props.onBackClick();
  }
  
  componentDidMount(){
    this.initNote();
  }
  
  render() {
    return (
      <div className="Edite-Note">  
        <button onClick={ this.handleBackClick }> Back </button>
        <button onClick={ this.handleDelete }> Delete </button>
        <MyEditor 
          note_id={ this.state.note_id }
          title={this.state.title}
          note={ this.state.note }
         />
      </div>
    )
  }
} 