import React, { Component } from 'react';
// import Navigation from './Navigation';
import { firebaseAuth } from '../../config/constants';
import { Link, browserHistory } from 'react-router';
import FlashMessage from '../FlashMessage';  
import Loading from './Loading';

// import $ from 'jquery';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authed: false,
      user: {},
      loading: true,
      theme:'white'
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
  
  whiteTheme = () =>{
    this.setState({
      theme: 'white',
    })
  }
  blackTheme = () =>{
    this.setState({
      theme: 'black',
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
      this.setState({
        theme:'white',
      })
      browserHistory.push('/');
    }.bind(this), function(error) {
      console.error('Sign Out Error', error);
    });
  }
  
  showLoading = () => {
    console.log('On loading')
    this.setState({
      loading: true,
    })
  }
  
  endLoading = () => {
    console.log('End Loading')
    this.setState({
      loading: false,
    })
  }
  
  render() {
    let themeColor;
    if(this.state.theme === "black"){
      themeColor = 'bg-dark-gray orange'
    }else{
      themeColor = "bg-white black"
    }
    return (
      this.state.loading === true ? 
        ( <Loading theme={this.state.theme}/>) : 
        (
          <div className={"App-root " + themeColor}>
            <div className="flex justify-between bb items-center" >
              <nav className="dt border-box f6 fw6 tracked pa2 w-100"> 
                <Link to="/" className={"f3 w-25 link black ttu dim dib pa3 mr3 dtc v-mid " + themeColor}>React Notes</Link>
                { this.state.authed?
                  <span className="w-75 tr dtc v-mid">
                    <span className="mr3 ">Hi, {this.state.user.email}</span>
                    <Link to="/list"  className={"link dim black br2 dib mr3 ba ph3 pv2 dim " + themeColor}
                                      activeClassName="active">My Notes</Link>
                                      
                    <a className={"f6 link dim br2 ba ph3 pv2 mb2 dib pointer mr2 " + themeColor}
                          onClick={this.logOut}> LogOut 
                    </a> 
                    <a className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mr2 " + themeColor}
                          onClick={this.whiteTheme}>white
                    </a>
                    <a className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mr2 " + themeColor}
                          onClick={this.blackTheme}>black
                    </a>
                  </span> :
                  <span className="w-75 tr dtc v-mid">
                    <Link className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mh2 " + themeColor}
                          to="/login" 
                          activeClassName="active">Log In</Link>
                    <Link className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mh2 " + themeColor}
                          to="/signup" 
                          activeClassName="active">Sign Up</Link>
                  </span>
                }
              </nav>
            </div>
            <div className={"App-main " + themeColor}>
              <FlashMessage />
              <div className={themeColor}>
                {this.props.children && 
                  React.cloneElement(this.props.children, 
                                    { authed: this.state.authed,
                                      showLoading: this.showLoading,
                                      endLoading: this.endLoading,
                                      theme:this.state.theme})}
              </div>
            </div>
          </div>
      )
    );
  }
}

export default App;
