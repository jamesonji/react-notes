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
    $.ajax({
      url: `${BASE_URL}/notes`,
      success: function (data) {
        this.setState({notes: data.notes})
      }.bind(this)
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
    return (
      <div> 
        <section className="fl w-100">
          {
            this.state.notes.map(
              function (note, index) {
                return (
                  <Link to={`/edit/${note._id}`} 
                        key={note._id}
                        className="link ba br4 bg-white b--black fl w-25 ma3 pa2 pointer shadow-1 hover-bg-light-red hover-white">
                    <span className="link f3 black hover-white">{note.title}</span>
                    <p className="f5 black mw-100 measure">{note.plaintext}</p>
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