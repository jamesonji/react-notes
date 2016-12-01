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
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleSubmit(){
    $.ajax({
            url:`${BASE_URL}/login`,
            type:"POST",
            success: function (data){
              console.log(data)
            }
    })
  }
  
  handleChange(event){
    this.setState({
      email: event.target.value,
    })
  }
  
  render(){
    return (
      <div className="Login-Form">
        <form onSubmit={this.handleSubmit} >
          <div>
            <label>Email:</label>
            <input type="text" 
                  value={this.state.email} 
                  onChange={this.handleChange}
                  name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
            </div>
        </form>
      </div>
    );
  }
};

export default LoginForm;