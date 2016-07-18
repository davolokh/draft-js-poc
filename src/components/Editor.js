import React from 'react';
import Draft from 'draft-js';
import Immutable from 'immutable';
import createUndoPlugin from 'draft-js-undo-plugin';
import Editor from 'draft-js-plugins-editor';
import StylingPanel from '../components/StylingPanel';

const {
  EditorState, 
  DefaultDraftBlockRenderMap, 
  ContentState, 
  ContentBlock, 
  CharacterMetadata, 
  Entity, 
  convertToRaw, 
  convertFromRaw
} = Draft;

const {Map, List} = Immutable;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({
      editorState
    });

    this.getEditorState = () => this._getEditorState();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    
    this.saveState = () => {
      const content = this.state.editorState.getCurrentContent();
      localStorage.setItem('data', JSON.stringify(convertToRaw(content)));
    };

    this.loadState = () => {
      const content = JSON.parse(localStorage.getItem('data'));
      const editorState = EditorState.createWithContent(convertFromRaw(content));
      this.onChange(editorState);
    }
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

  _getEditorState() {
    return this.state.editorState;
  }
  
  render() {
    return (
      <div>
        <div className="RichEditor-root">
          <StylingPanel getEditorState={this.getEditorState} onChange={this.onChange}/>
          <div onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              plugins={[undoPlugin]}
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
          <input
            onClick={this.saveState}
            type="button"
            value="Save State"
          />
          <input
            onClick={this.loadState}
            type="button"
            value="Load State"
          />
        <UndoButton />
        <RedoButton />
      </div>
      );
  }
}

export default RichEditorExample;