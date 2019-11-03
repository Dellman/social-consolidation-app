import React from 'react';

export default class SlackChannel extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.selected(this.props.channel.name)}
        style={{ ...styles.channel, ...{ backgroundColor: this.props.active ? "darkgray" : null } }}
      >
        <p>#{this.props.channel.name}</p>
      </div>
    )
  }
}

const styles = {
  channel: {
    cursor: "pointer",
    margin: 5
  }
}