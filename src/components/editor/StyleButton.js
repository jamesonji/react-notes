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
    let className = this.props.icon + ' wrapper f4 black-80 pa2 pointer';
    if (this.props.active) {
      // Style button whtn it is active
      className += ' f4 bg-black-80 white br2';
    }
    
    let button = null;
    if (this.props.icon !== ''){
      button = <div className={className} onMouseDown={this.onToggle}></div>
    }
    else{
      // If this is a header button will display text instead of font-awesome icon
      button = <div className={className + ' text-button'} onMouseDown={this.onToggle}>{this.props.label}</div>
    }
    
    return (
      <span className='editor-button'> 
        {button}
      </span>
    );
  }
}

export default StyleButton;