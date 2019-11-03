import React from 'react';
import { SLACK_TOKEN } from './api_keys/keys';

export default class CheckUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      chatAppName: "slack", //slack is the default
      placeholder: "username",
      error: "",
      userObj: {
        slack: {},
        discord: {},
        steam: {},
      }
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changeChatApp = this.changeChatApp.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }
  // update username in state when modifying the input field
  changeUsername(event) {
    this.setState({ username: event.target.value });
  }
  // update chatAppName in state when modifying the select dropdown
  changeChatApp(event) {
    const chatAppName = event.target.value;
    this.setState({ chatAppName });
    this.selectPlaceholder(chatAppName)
  }
  // different chat apps have different names for their unique ids, so display that as the placeholder
  selectPlaceholder(chatAppName) {
    let placeholder;
    if (chatAppName === "slack")
      placeholder = "username";
    else if (chatAppName === "discord")
      placeholder = "user ID";
    else if (chatAppName === "steam")
      placeholder = "steam ID";
    this.setState({ placeholder });
  }
  // go through the workflow of the specified chat app
  async checkUser(username) {
    const chatApp = this.state.chatAppName;
    if (chatApp === "slack") {
      let slackObj = await this.checkSlackUser(username);
      // empty slack object
      let userObj = this.state.userObj;
      if (Object.keys(slackObj).length === 0) {
        userObj.slack = {};
        this.setState({
          error: `no slack user in this workspace by: ${username}`,
          userObj
        });
      }
      else {
        userObj.slack = slackObj;
        this.setState({ userObj, error: "" });
      }
    }
    else if (chatApp === "discord") {
      this.checkDiscordUser(username);
    }
    else if (chatApp === "steam") {
      this.checkSteamUser(username);
    }
  }
  // returns an array of slack users in the workspace or an empty array on an error
  async getSlackUsers(token = SLACK_TOKEN) {
    const response = await fetch(`https://slack.com/api/users.list?token=${token}`);
    const responseJson = await response.json();
    // got users
    if (responseJson.ok) {
      return responseJson.members;
    }
    // unable to get users
    else {
      return [];
    }
  }
  // https://api.slack.com/types/user
  async checkSlackUser(username) {
    let members = await this.getSlackUsers();
    let slackObj = {};
    // got slack users
    if (members.length > 0) {
      for (let i = 0; i < members.length; i++) {
        // slack usernames are lowercased, but the user may not put the name in lowercased
        if (members[i].name === username.toLowerCase()) {
          slackObj = members[i];
          break;
        }
      }
    }
    return slackObj;
  }
  // https://discordapp.com/developers/docs/resources/user
  async checkDiscordUser() {

  }

  async checkSteamUser() {

  }

  render() {
    return (
      <div style={styles.mainContainer}>
        {/* input */}
        <select value={this.state.chatAppName} onChange={this.changeChatApp}>
          <option value="slack" defaultValue>
            Slack
        </option>
          <option value="discord">
            Discord
        </option>
          <option value="steam">
            Steam
        </option>
        </select>
        <input style={styles.leftSpacing} type="text" placeholder={this.state.placeholder} value={this.state.username} onChange={this.changeUsername} />
        <input style={styles.leftSpacing} type="submit" value="Check" onClick={() => this.checkUser(this.state.username)} />
        {/* output */}
        {/* this will show text that will go everywhere and is just for testing purposes 
        it will appear in release build as well
        */}
        <p>{JSON.stringify(this.state.userObj)}</p>
        <p>{this.state.error}</p>
      </div>
    )
  }
}

const styles = {
  leftSpacing: {
    marginLeft: 5
  },
  mainContainer: {
    paddingLeft: 20,
    paddingTop: 10
  },

}