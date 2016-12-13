import React from 'react';
import StyleButton from './StyleButton'    


const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon:''},
  {label: 'H2', style: 'header-two', icon:''},
  {label: 'H3', style: 'header-three', icon:''},
  {label: 'H4', style: 'header-four', icon:''},
  {label: 'H5', style: 'header-five', icon:''},
  {label: 'H6', style: 'header-six', icon:''},
  {label: 'Blockquote', style: 'blockquote', icon:'fa fa-quote-right fa-fw Icon'},
  {label: 'UL', style: 'unordered-list-item', icon:'fa fa-list-ul fa-fw Icon'},
  {label: 'OL', style: 'ordered-list-item', icon:'fa fa-list-ol fa-fw Icon'},
  {label: 'Code Block', style: 'code-block', icon:'fa fa-code fa-fw Icon'},
  {label: 'Section', style: 'section', icon:'fa fa-terminal fa-fw Icon'},
];


const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
    
  let blockClass;
  if(props.theme === 'black'){
    blockClass = "bg-dark-gray"
  }else{
    blockClass = "bg-white"
  }
  return (
    <div className={blockClass}>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
          theme={props.theme}
        />
      )}
    </div>
  );
};

export default BlockStyleControls;