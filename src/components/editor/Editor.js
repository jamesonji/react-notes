import React, { Component } from 'react';
import {Editor, 
        EditorState, 
        RichUtils, 
        DraftEditorBlock,
        DefaultDraftBlockRenderMap,
        getDefaultKeyBinding,
        KeyBindingUtil,
        convertToRaw,
        convertFromRaw,
      } from 'draft-js';
import CodeUtils from 'draft-js-code';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import ColorStyleControls from './ColorStyleControls';
import TitleField from './TitleField';
import Immutable from 'immutable';
import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001/notes';

const {hasCommandModifier} = KeyBindingUtil;

const styleMap = {
  'RED':{
    color: 'red',
  },
  'GOLD':{
    color: 'gold',
  },
  'BLUE':{
    color: 'blue',
  },
  'GREEN':{
    color: 'green',
  },
  'PINK':{
    color: 'HotPink',
  },
  'CAP':{
    textTransform: 'capitalize'
  },
  'UPP':{
    textTransform: 'uppercase'
  },
  'LINETHROUGH':{
    textDecoration: 'line-through'
  },
};

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'paragraph') {
    return {
      component: DraftEditorBlock,
      editable: true,
      props: {
        foo: 'bar',
      },
    };
  }
}

// Define a new block tag
const blockRenderMap = Immutable.Map({
  'section': {
    element: 'section'
  }
});

// add new block tag to the block render map
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    case 'code-block': return 'RichEditor-codeblock';
    default: return null;
  }
}

// get text content from contentState
function getTextContent(content){
  let contentText='';
  content.blocks.map(
    function(block){
      // return contentText += block.text + '\n'
      return contentText += block.text + ' '
    }
  )
  return contentText;
}

class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      editorState: EditorState.createEmpty(),
      note_id: props.note_id,
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.keyBindingFn = (e) => this._keyBindingFn(e);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleColorStyle = (style) => this._toggleColorStyle(style);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log('Note ID:' + this.state.note_id);
      console.log('Note Title: ' + this.state.title);
      console.log('text Content:' + getTextContent(convertToRaw(content)));
    };
    this.saveNote = this.saveNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.editTitle = this.editTitle.bind(this);
  }
 
  _onTab(e) {
    const {editorState} = this.state;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      this.onChange(RichUtils.onTab(e, editorState, 2));
        // return;
    }

    this.onChange(
        CodeUtils.handleTab(e, editorState)
    );
  }
  
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    ); 
  }
  
  _toggleColorStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    ); 
  }
  
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    let newState;
    if (command === 'toggle-h1') {
      this.toggleBlockType('header-one');
      return true;
    }
    if (command === 'toggle-h2') {
      this.toggleBlockType('header-two');
      return true;
    }
    if (command === 'toggle-h3') {
      this.toggleBlockType('header-three');
      return true;
    }
    if (command === 'toggle-h4') {
      this.toggleBlockType('header-four');
      return true;
    }
    if (command === 'toggle-code') {
      this.toggleBlockType('code-block');
      return true;
    }
    if (command === 'toggle-up') {
      this.toggleInlineStyle('Uppercase');
      return true;
    }

    if(CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }
    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  
  _keyBindingFn(event) {
    const {editorState} = this.state;
    let command;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(event);
    }
    if (event.keyCode === 49 /* `1` key */ && hasCommandModifier(event)) {
      // toggle H1
      return 'toggle-h1';
    }
    if (event.keyCode === 50 /* `2` key */ && hasCommandModifier(event)) {
      // toggle H2
      return 'toggle-h2';
    }
    if (event.keyCode === 51 /* `3` key */ && hasCommandModifier(event)) {
      // toggle H3
      return 'toggle-h3';
    }
    if (event.keyCode === 52 /* `4` key */ && hasCommandModifier(event)) {
      // toggle H4
      return 'toggle-h4';
    }
    if (event.keyCode === 71 /* `G` key */ && hasCommandModifier(event)) {
      // toggle Code mode
      return 'toggle-code';
    }
    if (event.keyCode === 67 /* `U` key */ && hasCommandModifier(event)) {
      // toggle upper case 
      return 'toggle-up';
    }
    if (command) {
      return command;
    }
    return getDefaultKeyBinding(event);
  } 
  
  handleReturn = (e) => {
    const {editorState} = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }
    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  componentWillReceiveProps(props){
    // If parent component passes in a note props, set editor to display the new text component
    if( props.title !== ''){
      this.setState({
        title: props.title,
      })
    }
    if (props.note){
      // this.setState({editorState: EditorState.createWithContent(ContentState.createFromText(props.note))}) 
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw( JSON.parse(props.note))),
        note_id: props.note_id,
      })
    }
  }
  
  editTitle(title){
    this.setState({
      title: title,
    })
  }
  
  saveNote(){
    const title = this.state.title;
    const {editorState} = this.state;
    let content = convertToRaw(editorState.getCurrentContent()); 
    let plaintext = getTextContent(content);
    content = JSON.stringify(content);
    $.ajax({
      url:`${BASE_URL}`,
      data:{title: title,
            content: content,
            plaintext: plaintext,
            author: 'Song Ji'},
      type:'POST',
      success: function (note){
        console.log(note);
      }
    })
  }
  
  updateNote(id){
    const title = this.state.title;
    const {editorState} = this.state;
    let content = convertToRaw(editorState.getCurrentContent()); 
    let plaintext = getTextContent(content);
    content = JSON.stringify(content);
    $.ajax({
      url:`${BASE_URL}/notes/${id}`,
      data:{title: title,
            content: content,
            plaintext: plaintext,
            author: 'Song Ji'},
      type:'PATCH',
      success: function (note){
        console.log(note);
      }
    })
  }
  
  handleUpdate(){
    this.updateNote(this.state.note_id);
  }
  
  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-root';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    
    const buttonStyle = "f5 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-red";
    return (
            <div className={className}>
              <TitleField title={this.state.title}
                          onChange={this.editTitle}/>
              <div>
                <a href='#' className={buttonStyle} onClick={this.logState}>Content</a>
                <a href='#' className={buttonStyle} onClick={this.saveNote}>Save</a>
                <a href='#' className={buttonStyle} onClick={this.handleUpdate}>Update</a>
              </div>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <ColorStyleControls
                editorState={editorState}
                onToggle={this.toggleColorStyle}
              />
              <div id='editor' onClick={this.focus}>
                <Editor editorState={editorState}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder="Enter some text..."
                        keyBindingFn={this.keyBindingFn}
                        handleKeyCommand={this.handleKeyCommand}
                        handleReturn={this.handleReturn}
                        blockRenderMap={extendedBlockRenderMap}
                        blockRendererFn={myBlockRenderer}
                        ref="editor"
                        />
              </div>
            </div>
          );
  }
}
export default MyEditor;