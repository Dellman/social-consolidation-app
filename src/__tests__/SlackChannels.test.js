import React from 'react';
import ReactDOM from 'react-dom';
import SlackChannels from '../slack/SlackChannels';
const testChannels = [
  {
    name: "test",
    id: 1
  },
  {
    name: "test2",
    id: 2
  }
]
function updateActiveChannel(activeChannel){

}
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlackChannels channels={testChannels} updateActiveChannel={updateActiveChannel}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});