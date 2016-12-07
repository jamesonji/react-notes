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
    facebookLogin();
  }
  
  handleGoogleLogin = () => {
    googleLogin();
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
        <form className="mw5 mw7-ns center ba pa3 ph5-ns">
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
        <div>
          <a className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
             onClick={this.handleFacebookLogin}> Sign in with Facebook </a>
          <a className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
             onClick={this.handleGoogleLogin}> Sign in with Google </a>
          <a className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
             onClick={this.handleGithubLogin}> Sign in with Github </a>
        </div>
      </div>
    );
  }
};

export default LoginForm;