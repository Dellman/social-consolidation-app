import React from 'react';
import SlackChannel from './SlackChannel';

export default class SlackChannels extends React.Component {
  constructor() {
    super();
    this.state = {
      active: "",
    }
    this.selectChannel = this.selectChannel.bind(this);
  }
  componentDidMount() {
    this.selectChannel(this.props.channels[0].name);
  }
  selectChannel(channel) {
    this.setState({ active: channel });
    this.props.updateActiveChannel(channel);
  }
  isChannelActive(channel) {
    if (channel === this.state.active)
      return true;
  }
  render() {
    return (
      <div style={styles.mainContainer}>
        {this.props.channels.length > 0
          ? <div style={styles.channelContainer}>
            {
              this.props.channels.map((channel) => {
                return <SlackChannel active={this.isChannelActive(channel.name)} selected={this.selectChannel} key={channel.id} channel={channel} />
              })
            }
          </div>
          : null}
      </div>
    )
  }
}

const styles = {
  mainContainer: {
    display: "flex",
  },
  channelContainer: {
    width: 120,
    borderRight: "1px solid black"
  }
}