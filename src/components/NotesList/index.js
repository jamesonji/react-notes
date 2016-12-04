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
        this.setState({notes: data.notes})
      }.bind(this)
    })
  }
  
  componentDidMount(){
    this.getNotes();
  }
  
  render (){
    return (
      <div> 
        <section className="fl w-100">
          {
            this.state.notes.map(
              function (note, index) {
                return (
                  <Link to={`/edit/${note._id}`} 
                        key={note._id}
                        className="link ba br4 dim b--dashed b--blue fl w-30 pa3 pointer">
                    <span className="link f3 orange hover-bg-light-yellow pa2">{note.title}</span>
                    <p className="f6 black mw-100 measure">{note.plaintext}</p>
                  </Link>
                )
              }
            )
          }
        </section>
      </div>
    )
  }
}

NotesList.defaultProps = {
  notes: [],
}
