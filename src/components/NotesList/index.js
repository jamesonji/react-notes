import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import {browserHistory} from 'react-router';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import {sendFlashMessage, dismissMessage} from '../../actions/index';

import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001';

class NotesList extends Component{
  constructor(props){
    super(props);
    this.state = { 
      notes: [],
    }
    this.getNotes = this.getNotes.bind(this);
  }
  
  showFlash = (message, className) => {
    this.props.sendFlashMessage(message, className)
    setTimeout(()=>{
      this.props.dismissMessage()
    }, 3000)
  }
  
  getNotes(){
    const user = firebase.auth().currentUser;
    if(!user){
      this.showFlash('Please login first', 'alert-warning');
      browserHistory.push('/login');
    }else{      
      $.ajax({
        url: `${BASE_URL}/notes`,
        data:{
          author: user.email,
        },
        type: 'POST',
        success: function (data) {
          console.log(data);
          this.setState({notes: data.notes})
        }.bind(this)
      })
    }
  }
  componentWillReceiveProps(){
    this.setState({
      theme: this.props.theme,
    })
  }
  
  componentDidMount(){
    const user = firebase.auth().currentUser;
    if(!user){
      //Check if user logged in, if not, push to login view
      browserHistory.push('/login')
    }
    
    this.getNotes();
  }
  
  render (){
    let listClass = "NoteListItem link fl w-100 w-50-m w-third-l "
    let titleClass = "link f2 hover-white lh-copy measure ph3 "
    let noteClass = "f6 measure ph3 "
    if (this.props.theme === 'black'){
      listClass += "hover-bg-light-yellow"
      titleClass += "orange"
      noteClass += "orange"
    }else {
      listClass += "hover-bg-light-red"
      titleClass += "black"
      noteClass += "black"
    }
    
    
    return (
      <div className="note-list cf pt3 ph4 pb3 mw8 center"> 
        <section className="fl w-100">
          {
            this.state.notes.map(
              function (note, index) {
                return (
                  <Link to={`/edit/${note._id}`} 
                        key={note._id}
                        className={listClass}>
                    <span className={titleClass}>{
                      note.title.length>15? 
                      note.title.substring(0,15)+ '...' :
                      note.title
                    }</span>
                    <p className={noteClass + ' blue'}>Created at: {note.createdAt.substring(0,10)}</p>
                    <p className={noteClass}>{note.plaintext.substring(0,100)+'...'}</p>
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

const mapPropsToDispatch = (dispatch) => {  
  return bindActionCreators({sendFlashMessage, dismissMessage}, dispatch);
};


export default connect(null, mapPropsToDispatch)(NotesList);