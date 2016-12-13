import React, { Component } from 'react';

class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    // let className = 'RichEditor-styleButton';
    let className = this.props.icon + ' wrapper f4 pa1 pointer v-mid';
    if (this.props.theme === 'black'){
      this.props.active? className += ' bg-orange dark-gray br2' : className += " orange";
    }else{
      this.props.active? className += ' bg-black-80 white br2' : className += " black-80";
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