import React from 'react';
import StyleButton from '../components/StyleButton';

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD'
  },
  {
    label: 'Italic',
    style: 'ITALIC'
  },
  {
    label: 'Underline',
    style: 'UNDERLINE'
  },
  {
    label: 'Monospace',
    style: 'CODE'
  },
];


class InlineStylesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = props.onToggle;
    this.getEditorState = props.getEditorState;
  }

  render() {
    const currentStyle = this.getEditorState().getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => <StyleButton
        key={type.label}
        active={currentStyle.has(type.style)}
        label={type.label}
        onToggle={this.onToggle}
        style={type.style}
        />
      )}
    </div>
    );
  };
}

export default InlineStylesPanel;