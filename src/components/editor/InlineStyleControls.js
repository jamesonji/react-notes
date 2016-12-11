import React from 'react';
import StyleButton from './StyleButton'

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'fa fa-bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'fa fa-italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'fa fa-underline'},
  {label: 'Highlight', style: 'HIGHLIGHT', icon: 'fa fa-pencil yellow'},
  {label: 'Cap', style: 'CAP', icon: ''},
  {label: 'UP', style: 'UPP', icon: ''},
  {label: 'Line-through', style: 'LINETHROUGH', icon: 'fa fa-strikethrough'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="b--light-gray">
      {INLINE_STYLES.map(type =>
        <StyleButton
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

export default InlineStyleControls;