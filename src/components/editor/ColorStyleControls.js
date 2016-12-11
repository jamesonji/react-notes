import React from 'react';
import ColorButton from './ColorButton'

var COLOR_STYLES = [
  {label: 'Red', style: 'RED', icon:''},
  {label: 'Gold', style: 'GOLD', icon:''},
  {label: 'Blue', style: 'BLUE', icon:''},
  {label: 'Green', style: 'GREEN', icon:''},
  {label: 'Pink', style: 'PINK', icon:''},
];

const ColorStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    // <div className="RichEditor-controls">
    <div className="bb b--light-gray">
      {COLOR_STYLES.map(type =>
        <ColorButton
          key={type.label}
          icon={type.icon}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default ColorStyleControls;