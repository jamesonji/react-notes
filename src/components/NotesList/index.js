import React, { Component } from 'react';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001';

export default class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { notes: []}
    
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
      <div className="Note-List">
        <ul className='ListItems'>
          {
            this.state.notes.map( function (note, index) {
              return (
                <li key={note._id}>
                  {note._id}
                  {note.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

NotesList.defaultProps = {
  notes: [],
}
