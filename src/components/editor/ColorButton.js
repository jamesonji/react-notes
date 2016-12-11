import React, { Component } from 'react';

class ColorButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = this.props.icon + ' wrapper f4 black-80 pa2 pointer';
    if (this.props.active) {
      className += ' f4 bg-black-80 white br2';
    }
    let button = null;
    if (this.props.icon !== ''){
      button = <div className={className} onMouseDown={this.onToggle}></div>
    }
    else{
      button = <div className={className + ' text-button'} onMouseDown={this.onToggle}>{this.props.label}</div>
    }
    
    return (
      <span className='editor-button'> 
        {button}
      </span>
    );
  }
}

export default ColorButton;