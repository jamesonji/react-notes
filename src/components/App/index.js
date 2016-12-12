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
              <nav className="f6 fw6 ttu tracked pa2"> 
                <Link to="/" className={"f3 link black dim dib pa3 mr3 " + themeColor}>React Notes</Link>
                <Link to="/" className={"link dim black dib mr3 "+ themeColor}
                             activeClassName="active">Home</Link>
                { this.state.authed?
                  <span className="flex-grow">
                    <Link to="/about" className={"link dim dib mr3 " + themeColor}
                                      activeClassName="active">About</Link>
                    <Link to="/list"  className={"link dim black br2 dib mr3 ba ph3 pv2 dim " + themeColor}
                                      activeClassName="active">{this.state.user.email}</Link>                   
                    <span className={"f6 link dim br2 ba ph3 pv2 mb2 dib pointer mr2 " + themeColor}
                          onClick={this.logOut}> LogOut 
                    </span> 
                    <span className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mr2 " + themeColor}
                          onClick={this.whiteTheme}>white
                    </span>
                    <span className={"f6 link dim br2 ba ph3 pv2 mb2 dib black pointer mr2 " + themeColor}
                          onClick={this.blackTheme}>black
                    </span>
                  </span> :
                  <span className="flex-grow">
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
