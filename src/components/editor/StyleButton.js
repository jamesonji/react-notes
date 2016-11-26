import React, { Component } from 'react';

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    // let className = 'RichEditor-styleButton';
    let className = this.props.icon + ' styleButton';
    if (this.props.active) {
      // className += ' RichEditor-activeButton';
      className += ' styleButton-active';
    }
    
    let button = null;
    let first_letter = this.props.label.charAt(0);
    // if this is not a header button, display font-awesome icon
    if (first_letter !== 'H'){
      button = <span className={className} onMouseDown={this.onToggle}></span>
    }
    else{
      // If this is a header button will display text instead of font-awesome icon
      button = <span className={className} onMouseDown={this.onToggle}>{this.props.label}</span>
    }
    
    return (
      <span className='editor-button'> 
        {button}
      </span>
    );
  }
}

export default StyleButton;