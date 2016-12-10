import React, { Component } from 'react';
import firebase from 'firebase';
import {Editor, 
        EditorState, 
        RichUtils, 
        DefaultDraftBlockRenderMap,
        getDefaultKeyBinding,
        Modifier,
        convertToRaw,
        convertFromRaw,
      } from 'draft-js';
import { saveNote,
         updateNote,
         deleteNote,
       } from '../../helpers/notes'
import CodeUtils from 'draft-js-code';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import ColorStyleControls from './ColorStyleControls';
import TitleField from './TitleField';
import Immutable from 'immutable';
import {browserHistory} from 'react-router';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import {sendFlashMessage, dismissMessage} from '../../actions/index';

import './style.css';

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
  // const type = contentBlock.getType();
}

// Define a new block tag
const blockRenderMap = Immutable.Map({
  'section': {
    element: 'section'
  },
});

// add new block tag to the block render map
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'ph0 f3 ';
    case 'code-block': return 'bg-light-gray';
    case 'section': return 'ph4 f4 white pv2 bg-dark-gray';
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
      editView: false,
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.keyBindingFn = (e) => this._keyBindingFn(e);
    this.handleReturn = (e) => this._handleReturn(e);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleColorStyle = (style) => this._toggleColorStyle(style);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log('Note ID:' + this.state.note_id);
      console.log('Note Title: ' + this.state.title);
      console.log('Content: ' + content);
      console.log('text Content:' + getTextContent(convertToRaw(content)));
      this.showFlash('Show Flash', 'alert-success')
    };
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
    const {editorState} = this.state;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    console.log('Selection State:' + selectionState);
    console.log('Current Content:' + contentState);
    this.onChange(
      RichUtils.toggleInlineStyle(
        Modifier.removeInlineStyle(contentState, selectionState, "RED"),
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
    if (command === 'toggle-h5') {
      this.toggleBlockType('header-five');
      return true;
    }
    if (command === 'toggle-h6') {
      this.toggleBlockType('header-six');
      return true;
    }
    if (command === 'toggle-code') {
      this.toggleBlockType('code-block');
      return true;
    }
    if (command === 'toggle-up') {
      this.toggleInlineStyle('UPP');
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
    if (event.keyCode === 49 /* `1` key */ && event.ctrlKey) {
      // toggle H1
      return 'toggle-h1';
    }
    if (event.keyCode === 50 /* `2` key */ && event.ctrlKey) {
      // toggle H2
      return 'toggle-h2';
    }
    if (event.keyCode === 51 /* `3` key */ && event.ctrlKey) {
      // toggle H3
      return 'toggle-h3';
    }
    if (event.keyCode === 52 /* `4` key */ && event.ctrlKey) {
      // toggle H4
      return 'toggle-h4';
    }
    if (event.keyCode === 53 /* `4` key */ && event.ctrlKey) {
      // toggle H4
      return 'toggle-h5';
    }
    if (event.keyCode === 54 /* `4` key */ && event.ctrlKey) {
      // toggle H4
      return 'toggle-h6';
    }
    if (event.keyCode === 67 /* `C` key */ && event.ctrlKey) {
      // toggle Code mode
      return 'toggle-code';
    }
    if (event.keyCode === 85 /* `U` key */ && event.ctrlKey) {
      // toggle upper case 
      return 'toggle-up';
    }
    if (command) {
      return command;
    }
    return getDefaultKeyBinding(event);
  } 
  
  _handleReturn(e) {
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
        editView: props.editView,
      })
    }
  }
  
  editTitle = (title) => {
    this.setState({
      title: title,
    })
  }
  
  showFlash = (message, className) => {
    this.props.sendFlashMessage(message, className)
    setTimeout(()=>{
      this.props.dismissMessage()
    }, 3000)
  }
  
  handleSave = () =>{
    const title = this.state.title;
    const {editorState} = this.state;
    let content = convertToRaw(editorState.getCurrentContent()); 
    let plaintext = getTextContent(content);
    content = JSON.stringify(content);
    const user = firebase.auth().currentUser;
    
    if(title === undefined || title === ""){
      console.log('Please enter a title');
      this.showFlash('Please enter a title', 'alert-warning');
    }else if(plaintext === ""){
      console.log('Note can not be empty');
      this.showFlash('Please enter some notes', 'alert-warning');
    }else if(!user){
      this.showFlash('Please sign in', 'alert-warning');
    }else{
      saveNote(title, content, plaintext, user.email)
      .done((data)=>{
        this.showFlash('Note saved', 'alert-success')
        browserHistory.push('/edit/'+data.note._id);
      })
      .fail((error)=>{
        this.showFlash('Note is not saved, something went wrong😕', 'alert-danger')
      });
    }  
  }
    
  handleDelete = () =>{
    const promp = confirm("Delete the note?");
    if (promp === true) {
      deleteNote(this.state.note_id)
        .done((data)=>{
          browserHistory.push('/list');
          this.showFlash('Your note is Deleted.', 'alert-info');
        })
        .fail((error)=>{
          this.showFlash("Failed to delete your current note, please try again", 'alert-danger')
        });
    }
  }
  
  handleUpdate = () => {
    const user = firebase.auth().currentUser;
    if (!user){
      this.showFlash('Please sign in first.', 'alert-warning');
    }else{
      const id = this.state.note_id;
      const title = this.state.title;
      const {editorState} = this.state;
      let content = convertToRaw(editorState.getCurrentContent()); 
      let plaintext = getTextContent(content);
      content = JSON.stringify(content);
      updateNote(id, title, content, plaintext)
        .done((data)=>{
          this.showFlash('Update successful!', 'alert-success');
          console.log('The note is updated' + data);
        })
        .fail((error)=>{
          console.log('Error: ' + error)
          this.showFlash('Note is not updated, something went wrong😕', 'alert-danger')
        });
    }
  }
  
  handleNewNote = () => {
    const user = firebase.auth().currentUser;
    if (!user){
      this.showFlash('Please sign in first.', 'alert-warning');
    }else{
      const id = this.state.note_id;
      const title = this.state.title;
      const {editorState} = this.state;
      let content = convertToRaw(editorState.getCurrentContent()); 
      let plaintext = getTextContent(content);
      content = JSON.stringify(content);
      updateNote(id, title, content, plaintext)
        .done((data)=>{ 
          console.log(data);
          browserHistory.push('/');
        })
        .fail((error)=>{
          console.log('Error: ' + error)
          this.showFlash("Failed to save your current note, please try again", 'alert-danger')
        });
    }
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
    
    const buttonStyle = "f6 link dim br2 ph3 pv2 mb2 mr2 dib white bg-red";
    return (
            <div className={className}>
              <div className="pallete fl bg-white br3 pa3 shadow-1">
                <a href='#' className={buttonStyle} onClick={this.logState}>Content</a>
                {this.state.note_id? 
                  <span className={buttonStyle} onClick={this.handleUpdate}>Update</span> :
                  <span className={buttonStyle} onClick={this.handleSave}>Save</span>
                }
                { this.state.editView?
                  (<span>
                    <span className={buttonStyle} onClick={this.handleDelete}>Delete</span>
                    <span className={buttonStyle} onClick={this.handleNewNote}>New</span>
                  </span>):
                  <span></span>
                } 
                
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
              </div>
              <div className="w-80 fl">
                <div className="w-80 center f3 h3 bn black-100 bg-white shadow-2">
                  <TitleField title={this.state.title}
                              onChange={this.editTitle}/>
                </div>
                <div id='editor' 
                     onClick={this.focus}
                     className='pt3 center ph4 w-80 bg-white bt--black shadow-1'>
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
                          stripPastedStyles={true}
                          ref="editor"
                  />
                </div>
              </div>
            </div>
          );
  }
}

const mapPropsToDispatch = (dispatch) => {  
  return bindActionCreators({sendFlashMessage, dismissMessage}, dispatch);
};


export default connect(null, mapPropsToDispatch)(MyEditor);