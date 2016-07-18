import React from 'react';
import StyleButton from '../components/StyleButton';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'header-one'
  },
  {
    label: 'H2',
    style: 'header-two'
  },
  {
    label: 'H3',
    style: 'header-three'
  },
  {
    label: 'H4',
    style: 'header-four'
  },
  {
    label: 'H5',
    style: 'header-five'
  },
  {
    label: 'H6',
    style: 'header-six'
  },
  {
    label: 'Blockquote',
    style: 'blockquote'
  },
  {
    label: 'UL',
    style: 'unordered-list-item'
  },
  {
    label: 'OL',
    style: 'ordered-list-item'
  },
  {
    label: 'Code Block',
    style: 'code-block'
  },
];

class BlockStylesPanel extends React.Component {
    constructor(props) {
      super(props);
      this.getEditorState = props.getEditorState;
      const selection = this.getEditorState().getSelection();
      this.blockType = this.getEditorState()
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      this.onToggle = props.onToggle;
    }

    render() {
      return (
        <div className="RichEditor-controls">
          {BLOCK_TYPES.map((type) => <StyleButton
            key={type.label}
            active={type.style === this.blockType}
            label={type.label}
            onToggle={this.onToggle}
            style={type.style}
          />
          )}
        </div>
      );
    }
}

export default BlockStylesPanel;