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

    return (
      <span className={className} onMouseDown={this.onToggle}></span>
    );
  }
}

export default StyleButton;