import React from 'react';
import { getSlackUserObjectIndex, convertEpoch } from "../AuxFunctions";

// this component's task is to pass data to the message it needs to display and then render them
// we want to override the default shouldComponentUpdate() due prop changes from different channels
export class SlackMessages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.userObjects = this.props.userObjects;
    this.usersLoaded = false; //retrieved user objects
  }
  hasMessages() {
    return this.props.messages.length > 0;
  }
  render() {
    return (
      <div style={styles.mainContainer}>
        {this.props.loading
          ? <div style={styles.centeredLoader}>
            <p>Loading...</p>
          </div>
          : this.hasMessages()
            ? this.props.messages.map((message) => {
              return <SlackMessage key={message.ts} message={message} userObj={this.props.userObjects[getSlackUserObjectIndex(this.userObjects, message.user)]} />
            })
            : <div style={styles.centeredLoader}>
              <p>No messages</p>
            </div>
        }
      </div>
    )
  }
}

/* TO DO: Implement addition features based off your message (editable) or another's message (emoji, comment, etc)
// messages you sent
class SentSlackMessage extends React.Component {

}
// messages other people sent
class ReceivedSlackMessage extends React.Component {

}*/

class SlackMessage extends React.PureComponent {
  // this functionality may be added to AuxFunctions depending on how other platforms return timestamps
  convertTime(ts){
    // the part of the timestamp we want is before the period
    ts = ts.split(".")[0];
    ts = Number(ts);
    return convertEpoch(ts);
  }
  render() {
    const {
      ts,
      text,
    } = this.props.message;
    let name;
    let profilePic;
    if (this.props.userObj) {
      name = this.props.userObj.name;
      profilePic = this.props.userObj.profilePic;
    }
    return (
      <div>
        <div style={styles.wholeMessageContainer}>
          <div style={styles.senderContainer}>
            <img style={styles.profilePic} src={profilePic} alt="profile icon" />
            <div>
              <div style={styles.senderContainerText}>
                <p style={styles.displayName}>{name}</p>
                <p style={styles.messageTime}>{this.convertTime(ts)}</p>
              </div>
              <div>
                <p style={styles.message}>{text}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
// some of these styles may want to be moved into an external CSS sheet
const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  message: {
    margin: 0
  },
  wholeMessageContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  senderContainer: {
    display: "flex",
  },
  senderContainerText: {
    display: "flex",
    alignItems: "baseline"
  },
  messageTime: {
    margin: 0,
    marginLeft: 3,
    fontSize: 12,
    fontWeight: 400,
  },
  displayName: {
    margin: 0,
    fontSize: 15,
    fontWeight: 900,
  },
  profilePic: {
    minHeight: 48,
    minWidth: 48,
    maxHeight: 48,
    maxWidth: 48,
    marginRight: 8
  },
  // this will be added to a main.css later
  centeredLoader: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}