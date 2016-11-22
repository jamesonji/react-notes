import React from 'react';
import StyleButton from './StyleButton'    


const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon:'fa fa-header'},
  {label: 'H2', style: 'header-two', icon:'fa fa-header'},
  {label: 'H3', style: 'header-three', icon:'fa fa-header'},
  {label: 'H4', style: 'header-four', icon:'fa fa-header'},
  {label: 'H5', style: 'header-five', icon:'fa fa-header'},
  {label: 'H6', style: 'header-six', icon:'fa fa-header'},
  {label: 'Blockquote', style: 'blockquote', icon:'fa fa-quote-right'},
  {label: 'UL', style: 'unordered-list-item', icon:'fa fa-list-ul'},
  {label: 'OL', style: 'ordered-list-item', icon:'fa fa-list-ol'},
  {label: 'Code Block', style: 'code-block', icon:'fa fa-code'},
  // {label: 'Section', style:'section', icon:'fa fa-header'},
  // {label: 'Pre', style:'pre', icon:'fa fa-header'},  
];


const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls;