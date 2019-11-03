import React from 'react';

export default class ChatAppButton extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.selected(this.props.chatAppName)}
        // stylistic choice to split the standard button styles and one that is conditional
        // an alternative is to put the condition in the style block and put it in the render method
        style={{ ...styles.button, ...{ backgroundColor: this.props.active ? "darkgray" : null } }}
      >
        <p>{this.props.chatAppName}</p>
      </div>
    )
  }
}

const styles = {
  button: {
    border: "1px black solid",
    borderRadius: 5,
    height: 50,
    width: 70,
    cursor: "pointer",
  }
}