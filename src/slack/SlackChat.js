import React from 'react';
import SlackChannels from './SlackChannels';
import { SlackMessages } from './SlackMessages';
import { SLACK_TOKEN } from '../api_keys/keys';
import { getSlackUserObjectIndex, getSlackUserObject } from "../AuxFunctions";

export default class SlackChat extends React.Component {
  constructor() {
    super();
    this.state = {
      channels: [],
      activeChannel: "",
      messages: [],
      parsedMessages: [], //messages that have been had their subtypes taken care of
    }
    this.userObjects = []; //array of objects container slack user objects with names, pictures, etc
    this.usersLoaded = false;
    this.messagesParsed = false;
    this.updateActiveChannel = this.updateActiveChannel.bind(this);
    this.messagesLoaded = false; //messages may be empty if a channel is empty
  }
  componentDidMount() {
    this.getChannels();
    // once the component mounts we are going to check for updated messages every 4 seconds
    setInterval(() => {
      this.updateActiveChannel(this.state.activeChannel);
    }, 4000);
  }
  // this function gets called every 4 seconds
  // certain things should only be executed on changes like setting messagesLoaded to false (having it always done would create a flash render)
  updateActiveChannel(activeChannel) {
    if (activeChannel !== this.state.activeChannel){
      this.setState({ activeChannel });
      this.messagesLoaded = false;
      this.messagesParsed = false;
    }
    let channelID = this.getChannelID(activeChannel);
    this.getConversationHistory(channelID);
    this.handleMessageSubtypes();
  }
  // get unique id for channel in order to get its' conversation history
  getChannelID(activeChannel) {
    const channels = this.state.channels;
    let channelID;
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];
      if (channel.name === activeChannel) {
        channelID = channel.id;
        break;
      }
    }
    return channelID;
  }
  // get all channels in a workspace
  async getChannels() {
    const response = await fetch(`https://slack.com/api/conversations.list?token=${SLACK_TOKEN}`,
    );
    const responseJson = await response.json();
    this.setState({ channels: responseJson.channels });
  }
  // get the conversation history of a channel
  async getConversationHistory(conversationID) {
    const response = await fetch(`https://slack.com/api/conversations.history?token=${SLACK_TOKEN}&channel=${conversationID}`,
    );
    const responseJson = await response.json();
    if (responseJson.ok){
      await this.loadUsers();
      this.setState({ messages: responseJson.messages });
      this.messagesLoaded = true;
    }
  }

  async loadUsers() {
    for (let i = 0; i < this.state.messages.length; i++) {
      const message = this.state.messages[i];
      if (getSlackUserObjectIndex(this.userObjects, message.user) === -1) {
        this.userObjects.push(await getSlackUserObject(message.user));
        if (i === this.state.messages.length - 1){
          this.usersLoaded = true;
        }
      }
      else{
        if (i === this.state.messages.length - 1){
          this.usersLoaded = true;          
        }
      }
    }
    
  }

  isLoading(){
    return !this.usersLoaded || !this.messagesParsed || !this.messagesLoaded;
  }

  // handles message subtypes like channel_join so children components can just display them
  async handleMessageSubtypes() {
    let messages = this.state.messages;
    let parsedMessages = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!message.subtype)
        parsedMessages.push(message);
      else {
        if (message.subtype === "channel_join") {
          message.text = await this.handleChannelJoin(message.text);
          parsedMessages.push(message);
        }
      }
    }
    this.setState({ parsedMessages: parsedMessages.reverse() });
    this.messagesParsed = true;
  }
  async handleChannelJoin(text) {
    // handle cases when the type of message is a user joined the channel
    // user names are between < and >
    // their slack ID is after the @ symbol
    const openingIndex = text.indexOf("<");
    const closingIndex = text.indexOf(">");
    // +2 to offset the @ symbol
    const userID = text.slice(openingIndex + 2, closingIndex);
    let userIndex = -1;
    if (this.userObjects)
      userIndex = getSlackUserObjectIndex(this.userObjects, userID);
    if (userIndex === -1) {
      let slackObj = await getSlackUserObject(userID);
      return text.replace(`<@${userID}>`, slackObj.name);
    }
    else {
      return text.replace(`<@${userID}>`, this.userObjects[userIndex].name);
    }
  }
  render() {
    return (
      this.props.active
        ? <div style={styles.mainContainer}>
          {this.state.channels.length > 0
            ? <SlackChannels updateActiveChannel={this.updateActiveChannel} channels={this.state.channels} />
            : null}
          {this.state.channels.length > 0
            ? <SlackMessages loading={this.isLoading()} messages={this.state.parsedMessages} userObjects={this.userObjects}/>
            : null
          }
        </div>
        : null
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    overflow: "auto"
  }
}