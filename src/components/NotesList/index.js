import React, { Component } from 'react';
import NoteList from './NoteList';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001';

export default class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { notes: []}
    
    this.getNotes = this.getNotes.bind(this);
    this.logData = this.logData.bind(this);
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
  
  componentDidMount(){
    this.getNotes();
  }
  
  render (){
    return (
      <div className="Notes-List">
        <NoteList 
          notes={this.state.notes}
          onClick={this.logData}/>
      </div>
    )
  }
}

NotesList.defaultProps = {
  notes: [],
}
