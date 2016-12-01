import React, {Component} from 'react';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3001/users';

class SignupForm extends Component{  
  constructor(props){
    super(props);
    this.state={
      email: '',
      firstName: '',
      lastName: '',
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
  
  handleSubmit = (event) => {
    // if(!canSignup){
    //   console.log('Can not sign up');
    // }
    // else{
    event.preventDefault();
    console.log(`${BASE_URL}/signup`);
    console.log('Submite hadeling');
    $.post({
      url:`${BASE_URL}/signup`,
      // type:"POST",
      data: {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.refs.password.value,
        password_confirmation: this.refs.password_confirmation.value,
      },
      success: function (data){
        console.log(data)
      }
    })
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
        <form >
          <div>
            <label>Email:</label>
            <input type="text" 
              value={this.state.email} 
              onChange={this.handleInputChange}
              name="email"/>
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" 
                   name="firstName"
                   value={this.state.firstName}
                   onChange={this.handleInputChange}/>
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" 
                   name="lastName"
                   value={this.state.lastName}
                   onChange={this.handleInputChange}/>
          </div>
          <div>
            <label>Password:</label>
            <input ref="password"
                   type="password" 
                   name="password"/>
          </div>
          <div>
            <label>Password confirmation:</label>
            <input ref="password_confirmation" 
                   type="password" 
                   name="password_confirmation"/>
          </div>
          <div>
            <input type="submit" onClick={this.handleSubmit} value="Sign Up"/>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;