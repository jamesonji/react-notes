import React, {Component} from 'react';
import {login, 
        facebookLogin, 
        googleLogin,
        githubLogin} from '../../helpers/auth';
// import $ from 'jquery';

// const BASE_URL = 'http://localhost:3001/users';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleSubmit(event){
    event.preventDefault();
    login(this.state.email, this.refs.password.value)
    // $.post({
    //         url:`${BASE_URL}/login`,
    //         data:{
    //           email: this.state.email,
    //           password: this.refs.password.value
    //         },
    //         success: function (data){
    //           console.log(data)
    //         }
    // })
  }
  
  handleFacebookLogin = () => {
    let facebookCallback = facebookLogin();
    console.log("Facebook callback: " + facebookCallback.message);
  }
  
  handleGoogleLogin = () => {
    let googleCallback = googleLogin();
    console.log("Google Callback: " + googleCallback);
  }
  
  handleGithubLogin = () => {
    githubLogin();
  }
  
  handleInputChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render(){
    return (
      <div className="Login-Form">
        <h1 className="mw4 center">Log In</h1>
        <div className="mw5 mw7-ns center pa3 ph5-ns">
        <form className="">
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Email:</label>
            <input className="pa2 input-reset ba bg-transparent w-100 measure" 
                  type="text" 
                  value={this.state.email} 
                  onChange={this.handleInputChange}
                  name="email"/>
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Password:</label>
            <input className="db pa2 input-reset ba bg-transparent"
                   ref="password"
                   type="password" 
                   name="password"/>
          </div>
          <div className="mt3">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                   type="submit" 
                   onClick={this.handleSubmit} value="Log In"/>
            </div>
        </form>
        <div className="mt3">Don't have an account? <a href="/signup" className="f5 link dim black-80">Sign up</a></div>
        <div className="mt4">
          <a className="b ph3 pv2 dib ma2 input-reset ba b--black bg-dark-blue white grow pointer f6"
             onClick={this.handleFacebookLogin}><i className="fa fa-facebook"></i>  Sign in with Facebook </a>
          <a className="b ph3 pv2 ma2 dib input-reset ba b--black bg-red white grow pointer f6"
             onClick={this.handleGoogleLogin}><i className="fa fa-google"></i> Sign in with Google </a>
          <a className="b ph3 pv2 ma2 dib input-reset ba b--black grow pointer f6"
             onClick={this.handleGithubLogin}><i className="fa fa-github"></i> Sign in with Github </a>
        </div>
      </div>
      </div>
    );
  }
};

export default LoginForm;