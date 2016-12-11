import React from 'react';
import StyleButton from './StyleButton'    


const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon:''},
  {label: 'H2', style: 'header-two', icon:''},
  {label: 'H3', style: 'header-three', icon:''},
  {label: 'H4', style: 'header-four', icon:''},
  {label: 'H5', style: 'header-five', icon:''},
  {label: 'H6', style: 'header-six', icon:''},
  {label: 'Blockquote', style: 'blockquote', icon:'fa fa-quote-right'},
  {label: 'UL', style: 'unordered-list-item', icon:'fa fa-list-ul'},
  {label: 'OL', style: 'ordered-list-item', icon:'fa fa-list-ol'},
  {label: 'Code Block', style: 'code-block', icon:'fa fa-code'},
  {label: 'Section', style: 'section', icon:'fa fa-terminal'},
];


const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="bb b--light-gray">
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