import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001';

export default class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { 
      notes: [],
    }
    this.getNotes = this.getNotes.bind(this);
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
  
  componentDidMount(){
    this.getNotes();
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
              }
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
