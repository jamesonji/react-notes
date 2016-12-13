import React, {Component} from 'react';
import {login, 
        facebookLogin, 
        googleLogin,
        githubLogin} from '../../helpers/auth';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {sendFlashMessage, dismissMessage} from '../../actions/index';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  showFlash = (message, className) => {
    this.props.sendFlashMessage(message, className)
    setTimeout(()=>{
      this.props.dismissMessage()
    }, 3000)
  }
  
  handleSubmit(event){
    this.props.showLoading();
    event.preventDefault();
    login(this.state.email, this.refs.password.value)
      .then(()=>{
        this.props.endLoading();
        browserHistory.push('/');
      })
      .catch((error) => {
        this.props.endLoading();
        this.showFlash(error, 'alert-warning');
      });
  }
  
  handleFacebookLogin = () => {
    this.props.showLoading();
    facebookLogin().then((result) => {
        this.props.endLoading();
        console.log('Facebook result: ' + result);
        browserHistory.push('/');
      }).catch((error)=> {
        this.props.endLoading();
        this.showFlash(error.message, 'alert-warning')
      });
  }
  
  handleGoogleLogin = () => {
    this.props.showLoading();
    googleLogin().then((result) => {
        this.props.endLoading();
        browserHistory.push('/');
      }).catch((error)=> {
        this.props.endLoading();
        this.showFlash(error.message, 'alert-warning')
      });
  }
  
  handleGithubLogin = () => {
    this.props.showLoading();
    githubLogin().then((result) => {
        this.props.endLoading();
        browserHistory.push('/');
      }).catch((error)=> {
        this.props.endLoading();
        this.showFlash(error.message, 'alert-warning')
      });
  }
  
  handleInputChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render(){
    return (
      <div className="Login-Form">
        <h1 className="mw5 center">Log In</h1>
        <div className="mw5 mw7-ns center pa3 ph5-ns">
        <form className="">
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Email:</label>
            <input className="pa2 input-reset ba w-100 measure" 
                  type="text" 
                  value={this.state.email} 
                  onChange={this.handleInputChange}
                  name="email"/>
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Password:</label>
            <input className="db pa2 input-reset ba"
                   ref="password"
                   type="password" 
                   name="password"/>
          </div>
          <div className="mt3">
            <a className="b ph3 pv2 input-reset ba b--black grow pointer f6"
                   type="submit" 
                   onClick={this.handleSubmit} value="Log In">Log In</a>
            </div>
        </form>
        <div className="mt3">Don't have an account? <a href="/signup" className="f5 link dim black-80">Sign up</a></div>
        <div className="mt4">
          <a className="b ph2 pv2 dib ma2 input-reset ba b--black bg-dark-blue white grow pointer f6"
             onClick={this.handleFacebookLogin}><i className="fa fa-facebook"></i>  Sign in with Facebook </a>
          <a className="b ph2 pv2 ma2 dib input-reset ba b--black bg-red white grow pointer f6"
             onClick={this.handleGoogleLogin}><i className="fa fa-google"></i> Sign in with Google </a>
          <a className="b ph2 pv2 ma2 dib input-reset ba b--black grow pointer f6"
             onClick={this.handleGithubLogin}><i className="fa fa-github"></i> Sign in with Github </a>
        </div>
      </div>
      </div>
    );
  }
};

const mapPropsToDispatch = (dispatch) => {  
  return bindActionCreators({sendFlashMessage, dismissMessage}, dispatch);
};

export default connect(null, mapPropsToDispatch)(LoginForm);