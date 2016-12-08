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
      <div className="note-list cf pa3 mw9 center"> 
        <section className="fl w-100">
          {
            this.state.notes.map(
              function (note, index) {
                return (
                  <Link to={`/edit/${note._id}`} 
                        key={note._id}
                        className="link fl w-100 w-50-m w-25-l pa3-m pa4-l hover-bg-light-red">
                    <span className="link f3 black hover-white lh-copy measure">{note.title}</span>
                    <p className="f5 black f6 lh-copy measure">{note.plaintext.substring(0,50)}</p>
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