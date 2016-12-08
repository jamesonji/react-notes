import React, {Component} from 'react';
import {auth, 
        facebookLogin, 
        googleLogin,
        githubLogin} from '../../helpers/auth';
// import $ from 'jquery';

// const BASE_URL = 'http://localhost:3001/users';

class SignupForm extends Component{  
  constructor(props){
    super(props);
    this.state={
      email: '',
    }
  }
  
  validateForm = (event) => {
    event.preventDefault()
    
    const currentPassword = this.refs.password.value
    const passwordConfirmation = this.refs.password_confirmation.value
    
    if (passwordConfirmation !== currentPassword) {
      alert("error! passwords do not match")
    } else if (currentPassword === "") {
      alert("error! cannot have empty password")
    } else if (this.state.email === "") {
      alert("error! email is blank")
    } else if (this.state.firstName === ""){
      alert("First name can not be empty");
    } else if (this.state.lastName === "") {
      alert("Last name can not be empty")
    } else{
      return true;
    }
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
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.email);
    console.log(this.refs.password.value);
    
    const currentPassword = this.refs.password.value
    const passwordConfirmation = this.refs.password_confirmation.value
    
    if (passwordConfirmation !== currentPassword) {
      alert("error! passwords do not match")
    } else if (currentPassword === "") {
      alert("error! cannot have empty password")
    } else if (this.state.email === "") {
      alert("error! email is blank")
    } else{
      auth(this.state.email, this.refs.password.value);
    }
    
    // if(!canSignup){
    //   console.log('Can not sign up');
    // }
    // else{
    // $.post({
    //   url:`${BASE_URL}/signup`,
    //   // type:"POST",
    //   data: {
    //     email: this.state.email,
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     password: this.refs.password.value,
    //     password_confirmation: this.refs.password_confirmation.value,
    //   },
    //   success: function (data){
    //     console.log(data)
    //   }
    // })
    // }
  }
  
  handleInputChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (
      <div className="Signup-Form">
        <h1 className="mw5 center">Sign Up</h1>
        <div className="mw5 mw7-ns center pa3 ph5-ns">
        <form>
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Email:</label>
            <input className="pa2 input-reset ba bg-transparent w-100 measure" 
              type="text" 
              value={this.state.email} 
              onChange={this.handleInputChange}
              name="email"/>
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy">Password:</label>
            <input class="db pa2 input-reset ba bg-transparent"
                   ref="password"
                   type="password" 
                   name="password"/>
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy">Password confirmation:</label>
            <input class="db pa2 input-reset ba bg-transparent"
                   ref="password_confirmation" 
                   type="password" 
                   name="password_confirmation"/>
          </div>
          <div className="mt3">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              type="submit"
              onClick={this.handleSubmit} 
                value="Sign Up"/>
          </div>
        </form>
        <div className="f6 mt3">Already have an account?<a href="/login" className="f5 link dim black-80"> Sign in</a></div>
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
}

export default SignupForm;