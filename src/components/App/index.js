import React, { Component } from 'react';
import Navigation from './Navigation';
import { firebaseAuth } from '../../config/constants';
// import { Link } from 'react-router';g
// import $ from 'jquery';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authed: false,
      user: {},
    }
  }
  
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
     if (user) {
       console.log(user);
       this.setState({
         authed: true,
         user: user,
       })
       console.log(user);
     } else {
       this.setState({
         authed: false,
         user: {},
       })
     }
   })
  }
  
  logOut = () =>{
    firebaseAuth().signOut().then(function() {
      this.setState({
        authed: false,
        user: {},
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
        <Navigation authed={this.state.authed}
                    logOut={this.logOut}/>
        <div className="App-main">
          <div className="ph4 pv4">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
