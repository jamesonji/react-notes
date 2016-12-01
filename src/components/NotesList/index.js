import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001';

export default class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { 
      notes: [],
    }
    this.getNotes = this.getNotes.bind(this);
    this.showNote = this.showNote.bind(this);
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
  
  showNote(event){
    console.log(event.target.id);
  }
  
  render (){
    return (
      <div className="Notes">
        <ul>
          {
            this.state.notes.map(
              function (note, index) {
                return (
                  <li className="List-Item"
                      key={note._id}>
                  <Link to={`/edit/${note._id}`}>{note.title}</Link>
                  </li>
                )
              }.bind(this)
            )
          }
        </ul>
      </div>
    )
  }
}

NotesList.defaultProps = {
  notes: [],
}
