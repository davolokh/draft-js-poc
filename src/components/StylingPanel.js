import React from 'react';
import Draft from 'draft-js';
import BlockStylesPanel from '../components/BlockStylesPanel';
import InlineStylesPanel from '../components/InlineStylesPanel';

const {RichUtils} = Draft;

class StylingPanel extends React.Component {
    constructor(props) {
      super(props);
      this.getEditorState = props.getEditorState;
      this.onChange = props.onChange;

      this.toggleBlockType = (type) => this._toggleBlockType(type);
      this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.getEditorState(),
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.getEditorState(),
        inlineStyle
      )
    );
  }

  render() {
    return <div>
      <BlockStylesPanel
        getEditorState={this.getEditorState}
        onToggle={this.toggleBlockType}
      />
      <InlineStylesPanel
        getEditorState={this.getEditorState}
        onToggle={this.toggleInlineStyle}
      />
    </div>
  }
}

export default StylingPanel;