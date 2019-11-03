import { SLACK_TOKEN } from './api_keys/keys';

export async function getSlackUserObject(slackID) {
  let slackUserObj = {};
  const response = await fetch(`https://slack.com/api/users.info?token=${SLACK_TOKEN}&user=${slackID}`);
  const responseJson = await response.json();
  if (responseJson.ok) {
    slackUserObj = {
      id: slackID,
      // slack has multiple fields for names
      // for now, we are going to use the display name if it is set, otherwise their default name
      name: responseJson.user.profile.display_name || responseJson.user.name,
      tzOffset: responseJson.user.tz_offset,
      profilePic: responseJson.user.profile.image_48
    }
  }
  return slackUserObj;
}

export function getSlackUserObjectIndex(userObjects, slackID) {
  for (let i = 0; i < userObjects.length; i++) {
    if (userObjects[i].id === slackID) {
      return i;
    }
  }
  return -1;
}

export function convertEpoch(ts) {
  let date = new Date(ts * 1000);
  let converted = convertHours(date.getHours());
  return `${converted.hours}:${date.getMinutes()}${converted.meridiem} ${date.toDateString()}`;
}
// return AM/PM and convert military time to civilian time
function convertHours(hours) {
  let hourObj = {
    hours: 0,
    meridiem: "AM"
  };
  if (hours === 0){
    hourObj.hours = 12;
  }
  // 1 to 11 hours is the morning
  else if (hours <= 11) {
    hourObj.hours = hours;
  }
  else {
    hourObj.hours = hours === 12 ? 12 : hours - 12;
    hourObj.meridiem = "PM";
  }
  return hourObj;
}