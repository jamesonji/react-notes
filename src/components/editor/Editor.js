import React, { Component } from 'react';
import {Editor, 
        EditorState, 
        RichUtils, 
        DraftEditorBlock,
        DefaultDraftBlockRenderMap,
        convertToRaw,
        convertFromRaw,
      } from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import TitleField from './TitleField';
import Immutable from 'immutable';
import $ from 'jquery';
import './style.css';

const BASE_URL = 'http://localhost:3001';

const styleMap = {
 'CODE': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
  'RED':{
    color: 'yellow',
    backgroundColor: 'rgba(255, 232, 250, 0.6)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 20,
    padding: 2,  
  }
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
    default: return null;
  }
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
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
      console.log(this.state.note_id);
    };
    this.saveNote = this.saveNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.editTitle = this.editTitle.bind(this);
  }
 
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
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
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
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
    console.log(title);
    this.setState({
      title: title,
    })
  }
  
  saveNote(){
    const title = this.state.title;
    console.log(this.state.title);
    const {editorState} = this.state;
    let content = convertToRaw(editorState.getCurrentContent()); 
    content = JSON.stringify(content);
    console.log(content);
    $.ajax({
      url:`${BASE_URL}`,
      data:{title: title,
            content: content,
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
    content = JSON.stringify(content);
    $.ajax({
      url:`${BASE_URL}/notes/${id}`,
      data:{title: title,
            content: content,
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

    return (
            <div className={className}>
              <TitleField title={this.state.title}
                          onChange={this.editTitle}/>
                          
              <button onClick={this.logState}>Content</button>
              <button onClick={this.saveNote}>Save</button>
              <button onClick={this.handleUpdate}>Update</button>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div id='editor' onClick={this.focus}>
                <Editor editorState={editorState}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder="Enter some text..."
                        handleKeyCommand={this.handleKeyCommand}
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