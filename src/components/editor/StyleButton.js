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
    let className = this.props.icon + ' f3 black-80 pa2 pointer';
    if (this.props.active) {
      // Style button whtn it is active
      className += ' f3 bg-black-80 white br2';
    }
    
    let button = null;
    if (this.props.icon !== ''){
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