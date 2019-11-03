import React from 'react';
import ReactDOM from 'react-dom';
import SlackChannel from '../slack/SlackChannel';
const testChannel = {
  name: "test"
}
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlackChannel channel={testChannel}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});