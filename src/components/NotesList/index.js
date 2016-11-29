import React, { Component } from 'react';
import NoteList from './NoteList';
import EditNote from './EditNote';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001';

export default class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { 
      notes: [],
      note: '',
      note_id: '',
      title: ''
    }
    
    this.getNotes = this.getNotes.bind(this);
    this.logData = this.logData.bind(this);
    this.editNote = this.editNote.bind(this);
    this.clearNote = this.clearNote.bind(this);
  }
  
  getNotes(){
    $.ajax({
      url: `${BASE_URL}/notes`,
      success: function (data) {
        console.log(data);
        this.setState({notes: data.notes})
      }.bind(this)
    })
  }
  
  logData(title){
    console.log(title);
  }
  
  editNote(id, content, title){
    this.setState({
      note_id: id,
      title: title,
      note: content,
    })
  }
  
  clearNote(){
    this.setState({
      note_id: '',
      title: '',
      note: '',
    })
    this.getNotes();
  }
  
  componentDidMount(){
    this.getNotes();
  }
  
  render (){
    var content;
    if (this.state.note){
      content = <EditNote 
                  onBackClick={this.clearNote}
                  note_id={this.state.note_id}
                  title={this.state.title}
                  note={this.state.note} />
    }else{
      content = <div className="Notes-List">
                  <NoteList 
                    notes={this.state.notes}
                    onClick={this.editNote}/>
                </div>
    }
    
    return (
      <div className="Notes">
        {content}
      </div>
    )
  }
}

NotesList.defaultProps = {
  notes: [],
}
