import React, { Component } from 'react';

export default class TitleField extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title,
    }
    this.forwardTitle = this.forwardTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  forwardTitle(title) {
    return function (event) {
      this.props.onChange(title);
    }
  }
  
  componentWillReceiveProps(props){
    this.setState({
      title: props.title,
    })
  }
  
  handleChange(event){
    let title = event.target.value
    this.setState({
      title: title
    })
    this.props.onChange(title);
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

TitleField.defaultProps ={
  title: 'Note title',
  onChange: function(){}
}