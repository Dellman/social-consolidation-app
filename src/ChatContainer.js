import React from 'react';
import ChatAppButton from './design_components/ChatAppButton';
import SlackChat from './slack/SlackChat';

export default class ChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      active: "slack"
    }
    this.selectChatApp = this.selectChatApp.bind(this);
  }
  selectChatApp(chatApp) {
    this.setState({ active: chatApp });
  }
  isChatAppActive(chatApp) {
    if (chatApp === this.state.active)
      return true;
  }
  render() {
    return (
      <div style={styles.mainContainer}>
        <div style={styles.buttonsContainer}>
          <ChatAppButton selected={this.selectChatApp} active={this.isChatAppActive("slack")} chatAppName={"slack"} />
          <ChatAppButton selected={this.selectChatApp} active={this.isChatAppActive("discord")} chatAppName={"discord"} />
          <ChatAppButton selected={this.selectChatApp} active={this.isChatAppActive("steam")} chatAppName={"steam"} />
        </div>
        <div style={styles.chatArea}>
          <SlackChat active={this.isChatAppActive("slack")} />
        </div>
      </div>
    )
  }
}

const styles = {
  mainContainer: {
    border: "1px black solid",
    borderRadius: 2,
    margin: 20,
    height: "80%",
    display: "flex",
    flex: 1
  },
  buttonsContainer: {
    width: 70,
    height: "100%",
    borderRight: "1px solid black"
  },
  chatArea: {
    flex: 1,
    backgroundColor: "azure"
  }
}