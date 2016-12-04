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
    let className = this.props.icon + ' styleButton';
    if (this.props.active) {
      className += ' styleButton-active';
    }
    
    return (
      <span className='editor-button'> 
        <span className={className} onMouseDown={this.onToggle}>{this.props.label}</span>
      </span>
    );
  }
}

export default ColorButton;