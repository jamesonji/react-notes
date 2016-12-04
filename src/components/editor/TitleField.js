import React, { Component } from 'react';

const inputStyle = "f3 f3-l input-reset bn fl black-80 bg-washed-yellow pa3 lh-solid w-40 w-40-m w-40-l br2-ns br--left-ns";

export default class TitleField extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title,
    }
    this.handleChange = this.handleChange.bind(this);
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
            placeholder={'🤔 Need a title here 😈'}
             className={inputStyle}
             value={this.state.title}
             onChange={this.handleChange}
      />
    )
  }
} 

TitleField.defaultProps ={
  title: '',
  onChange: function(){}
}