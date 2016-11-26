import React, { Component } from 'react';
import {Editor, 
        EditorState, 
        RichUtils, 
        DraftEditorBlock,
        DefaultDraftBlockRenderMap,
        convertToRaw,
      } from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import Immutable from 'immutable';
import './style.css';

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
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
  }
  
  _onBoldClick() {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
 
  _onItalicClick() {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onStrikThroughClick() {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }
  _onCodeClick() {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HEADER-TWO'));
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
  
  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
            <div className="RichEditor-root">
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
              <button onClick={this._onItalicClick.bind(this)}>Italic</button>
              <button onClick={this._onStrikThroughClick.bind(this)}>StrikThrough</button>
              <button onClick={this._onCodeClick.bind(this)}>Code</button>
              <button onClick={this.logState}>Content</button>
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