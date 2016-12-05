import React, { Component } from 'react';
import Navigation from './Navigation';
import { firebaseAuth } from '../../config/constants';
import { Link } from 'react-router';
import $ from 'jquery';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authed: false,
    }
  }
  
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
     if (user) {
       console.log(user);
       this.setState({
         authed: true,
       })
       console.log(user);
     } else {
       this.setState({
         authed: false,
       })
     }
   })
  }
  
  logOut = () =>{
    firebaseAuth().signOut().then(function() {
      this.setState({
        authed: false,
      })
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    // $.get({
    //   url: 'http://localhost:3001/logout',
    //   success: function(data){
    //     console.log(data);
    //   }
    // })
  }
  
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-main">
          { this.state.authed ? 
            <button onClick={this.logOut}> LogOut </button> :
            <span>
              <Link to="/login" activeClassName="active">Log In</Link>
              <Link to="/signup" activeClassName="active">Sign Up</Link>
            </span>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
