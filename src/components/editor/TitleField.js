import React, { Component } from 'react';

export default class TitleField extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
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
      // <div className="f3 ba input-reset bn fl black-100 bg-white pa3 lh-solid w-80 br2-ns br--left-ns">
      <div>
        <input type="text" 
            placeholder={'Enter a title'}
             value={this.state.title}
             onChange={this.handleChange}
             className="title-field w-100 h3 ph3"
        />
      </div>
    )
  }
} 

TitleField.defaultProps ={
  title: '',
  onChange: function(){}
}