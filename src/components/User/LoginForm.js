import React, {Component} from 'react';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001/users';

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
    $.post({
            url:`${BASE_URL}/login`,
            data:{
              email: this.state.email,
              password: this.refs.password.value
            },
            success: function (data){
              console.log(data)
            }
    })
  }
  
  handleInputChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render(){
    return (
      <div className="Login-Form">
        <form>
          <div>
            <label>Email:</label>
            <input type="text" 
                  value={this.state.email} 
                  onChange={this.handleInputChange}
                  name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input ref="password"
                   type="password" 
                   name="password"/>
          </div>
          <div>
            <input type="submit" onClick={this.handleSubmit} value="Log In"/>
            </div>
        </form>
      </div>
    );
  }
};

export default LoginForm;