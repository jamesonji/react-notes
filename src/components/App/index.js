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
        <Navigation authed={this.state.authed}/>
        <div className="App-main">
          <div className="w-100 pv2 tr">
          { this.state.authed ? 
            <div className="f6 link dim br2 ba ph3 pv2 mb2 dib black pointer"
                  onClick={this.logOut}> LogOut 
            </div> :
            <div>
              <Link className="f6 link dim br2 ba ph3 pv2 mb2 dib red pointer"
                    to="/login" activeClassName="active">Log In</Link>
              <Link className="f6 link dim br2 ba ph3 pv2 mb2 dib blue pointer"
                    to="/signup" activeClassName="active">Sign Up</Link>
            </div>
          }
        </div>
        <div className="ph3">
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
