import React, { Component } from 'react';
// import Navigation from './Navigation';
import { firebaseAuth } from '../../config/constants';
import { Link, browserHistory } from 'react-router';
import FlashMessage from '../FlashMessage';  
import UserAction from '../UserAction';  

// import $ from 'jquery';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authed: false,
      user: {},
      loading: true,
    }
  }
  
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      console.log('User: ' + user)
     if (user) {
       this.setState({
         authed: true,
         user: user,
         loading: false,
       })
       browserHistory.push('/')
     } else {
       this.setState({
         authed: false,
         user: {},
         loading: false,
       })
     }
   })
  }
  
  logOut = () =>{
    firebaseAuth().signOut().then(function() {
      this.setState({
        authed: false,
        user: {},
        loading: false,
      })
      console.log('Signed Out');
      browserHistory.push('/');
    }.bind(this), function(error) {
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
      this.state.loading === true ? 
        ( <div className="vh-100 dt w-100 bg-white">
            <div className="dtc v-mid tc black ph3 ph4-l">
              <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : 
        (
          <div className="ba--light-red">
            <div className="flex justify-between bb b--black-80 " >
              <nav className="f6 fw6 ttu tracked"> 
              <h2 className="black dib mr3">React Notes</h2>
                <Link to="/" className="link dim black dib mr3"
                                 activeClassName="active">Home</Link>
                { this.state.authed?
                  <span><Link to="/about" className="link dim black dib mr3"
                                          activeClassName="active">About</Link>
                        <Link to="/list"  className="link dim black br2 dib mr3 ba ph3 pv2 dim"
                                          activeClassName="active">{this.state.user.email}</Link>                   
                    <span className="f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mr2"
                          onClick={this.logOut}> LogOut 
                    </span> 
                  </span> :
                  <span>
                    <Link className="f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mh2"
                          to="/login" activeClassName="active">Log In</Link>
                    <Link className="f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mh2"
                          to="/signup" activeClassName="active">Sign Up</Link>
                  </span>
                }
              </nav>
            </div>
            <div className="App-main">
              <FlashMessage />
              <UserAction />
              <div className="bg-white">
                {this.props.children}
              </div>
            </div>
          </div>
      )
    );
  }
}

export default App;
