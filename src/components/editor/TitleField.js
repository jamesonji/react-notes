import React, { Component } from 'react';

export default class TitleField extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title,
    }
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    this.setState({
      title: event.target.value
    });
  }
  
  render(){
    return (
      <input type="text" 
             value={this.state.title}
             onChange={this.handleChange}
      />
    )
  }
} 

TitleField.defaultProps = {
  title: "Note Title",
}