import React, { Component } from 'react';
import firebase from 'firebase';
// import Editor from 'draft-js-plugins-editor';
import { Editor,
        EditorState, 
        RichUtils, 
        Modifier,
        // CompositeDecorator,
        ContentState,
        DefaultDraftBlockRenderMap,
        getDefaultKeyBinding,
        convertToRaw,
        convertFromRaw,
      } from 'draft-js';
import { saveNote,
         updateNote,
         deleteNote,
       } from '../../helpers/notes'
// import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import CodeUtils from 'draft-js-code';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import TitleField from './TitleField';
import Immutable from 'immutable';
import {browserHistory} from 'react-router';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import {sendFlashMessage, dismissMessage} from '../../actions/index';

import './style.css';

// const blockBreakoutPlugin = createBlockBreakoutPlugin();
// const plugins = [blockBreakoutPlugin]
const styleMap = {
  'HIGHLIGHT':{
    backgroundColor:'yellow',
    color:'black'
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

const tabCharacter = "  ";
  
// const SNIPPET_REGEX = /`[.\S]+/g;
// 
// function snippetStrategy(contentBlock, callback, contentState) {
//   findWithRegex(SNIPPET_REGEX, contentBlock, callback);
// }
// 
// function findWithRegex(regex, contentBlock, callback) {
//   const text = contentBlock.getText();
//   let matchArr, start;
//   while ((matchArr = regex.exec(text)) !== null) {
//     start = matchArr.index;
//     callback(start, start + matchArr[0].length);
//   }
// }
// 
// const SnippetSpan = (props) => {
//   return (
//     <span
//       className={"Snippet"}
//       data-offset-key={props.offsetKey}
//     >
//       {props.children}
//     </span>
//   );
// };

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
    super(props);
    // const compositeDecorator = new CompositeDecorator([
    //   {
    //     strategy: snippetStrategy,
    //     component: SnippetSpan,
    //   },
    // ]);
    
    this.state = {
      title: props.title,
      editorState: EditorState.createEmpty(),
      note_id: props.note_id,
      editView: false,
      readonly: false,
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
    e.preventDefault();

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({ 
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
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
    if (command === 'toggle-quote') {
      this.toggleBlockType('blockquote');
      return true;
    }
    if (command === 'toggle-ul') {
      this.toggleBlockType('unordered-list-item');
      return true;
    }
    if (command === 'toggle-ol') {
      this.toggleBlockType('ordered-list-item');
      return true;
    }
    if(command === 'toggle-terminal'){
      this.toggleBlockType('section');
      return true
    }
    if (command === 'toggle-up') {
      this.toggleInlineStyle('UPP');
      return true;
    }
    if (command === 'toggle-cap') {
      this.toggleInlineStyle('CAP');
      return true;
    }
    if (command === 'toggle-strikethrough') {
      this.toggleInlineStyle('LINETHROUGH');
      return true;
    }
    if (command === 'toggle-highlight') {
      this.toggleInlineStyle('HIGHLIGHT');
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
    if (event.keyCode === 49 /* `1` key */ && event.altKey) {
      // toggle H1
      return 'toggle-h1';
    }
    if (event.keyCode === 50 /* `2` key */ && event.altKey) {
      // toggle H2
      return 'toggle-h2';
    }
    if (event.keyCode === 51 /* `3` key */ && event.altKey) {
      // toggle H3
      return 'toggle-h3';
    }
    if (event.keyCode === 52 /* `4` key */ && event.altKey) {
      // toggle H4
      return 'toggle-h4';
    }
    if (event.keyCode === 53 /* `5` key */ && event.altKey) {
      // toggle H4
      return 'toggle-h5';
    }
    if (event.keyCode === 54 /* `6` key */ && event.altKey) {
      // toggle H4
      return 'toggle-h6';
    }
    if (event.keyCode === 67 /* `C` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-code';
    }
    if (event.keyCode === 72 /* `H` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-highlight';
    }
    if (event.keyCode === 76 /* `L` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-ul';
    }
    if (event.keyCode === 79 /* `O` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-ol';
    }
    if (event.keyCode === 80 /* `P` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-cap';
    }
    if (event.keyCode === 81 /* `C` key */ && event.altKey) {
      // toggle Code mode
      return 'toggle-quote';
    }
    if (event.keyCode === 83 /* `S` key */ && event.altKey) {
      // toggle upper case 
      return 'toggle-strikethrough';
    }
    if (event.keyCode === 84 /* `T` key */ && event.altKey) {
      // toggle upper case 
      return 'toggle-terminal';
    }
    if (event.keyCode === 85 /* `U` key */ && event.altKey) {
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
  
  handlePastedText = (text) =>{
    console.log(text);
    const {editorState} = this.state;
    // const blockMap = ContentState.createFromText(text.trim()).blockMap;
    const blockMap = ContentState.createFromText(text.trim(), '\r\n').blockMap;
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
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
  
  getBlockStyle = (block) => {
    if (this.props.theme === 'black'){
      switch (block.getType()) {
        case 'blockquote': return 'Block-quote pa4 athelas ml0 mt0 pl4 black-90 bl bw2 b-light-red';
        case 'code-block': return 'br2 bg-washed-yellow black ph3 pv2 shadow-2';
        // case 'header-six': return 'Folder f5 pt1 ph2 bg-light-yellow ba br--top b--black-80 br3 mw5';
        case 'section': return 'Terminal ph2 f4 black pv2 bg-light-yellow';
        default: return null;
      }
    }else{    
      switch (block.getType()) {
        case 'blockquote': return 'Block-quote pa4 athelas ml0 mt0 pl4 black-90 bl bw2 b--light-red';
        case 'code-block': return 'Code-block shadow-2 ba b--black-30';
        // case 'header-six': return 'Folder f5 h1 pt1 ph2 bg-light-yellow ba br--top b--black-80 br3 mw5';
        case 'section': return 'Terminal ph2 f4 white pv2 bg-dark-gray';
        default: return null;
      }
    }
  }
  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-root ';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder ';
      }
    }
    
    const buttonStyle = "f6 link mw4 dim br2 pa2 mb2 mr2 dib white pointer";
    let themeColor;
    if(this.props.theme === 'black'){
      themeColor = "bg-dark-gray white"
    }else{
      themeColor = "bg-white black"
    }
    
    return (
            <div className={className + themeColor}>
              {this.props.readOnly?
                <div className={"mw8 center "+ themeColor}>Please login to create your own notes
                </div>
                :
                <div className={"mw8 center shadow-1 pa2 " + themeColor}>
                  {this.state.note_id? 
                    <span className={buttonStyle + " bg-blue"} onClick={this.handleUpdate}>Update</span> :
                    <span className={buttonStyle + " bg-orange"} onClick={this.handleSave}>Save</span>
                  }
                  { this.state.editView?
                    (<span>
                      <span className={buttonStyle + " bg-orange"} onClick={this.handleNewNote}>New</span>
                      <span className={buttonStyle + " bg-red"} onClick={this.handleDelete}>Delete</span>
                    </span>):
                    <span></span>
                  } 
                  
                  <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                    theme={this.props.theme}
                  />
                  <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                    theme={this.props.theme}
                    className="tr"
                  />
                </div>
              }

              <div className="mw8 center ">
                <div className={"f3 h3 bn black-100 shadow-2 " + themeColor}>
                  <TitleField title={this.state.title}
                              onChange={this.editTitle}
                              readOnly={this.props.readOnly}
                              theme={this.props.theme}/>
                </div>
                <div id="editor" 
                     onClick={this.focus}
                     className={'pv3 ph4-l ph3-ns ph3-m shadow-1 ' + themeColor + ' editor-'+ this.props.theme}>
                  <Editor editorState={editorState}
                          blockStyleFn={this.getBlockStyle}
                          customStyleMap={styleMap}
                          onChange={this.onChange}
                          onTab={this.onTab}
                          placeholder="Enter some text..."
                          keyBindingFn={this.keyBindingFn}
                          handleKeyCommand={this.handleKeyCommand}
                          handleReturn={this.handleReturn}
                          blockRenderMap={extendedBlockRenderMap}
                          blockRendererFn={myBlockRenderer}
                          readOnly={this.props.readOnly}
                          handlePastedText={this.handlePastedText}
                          // plugins={plugins}
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