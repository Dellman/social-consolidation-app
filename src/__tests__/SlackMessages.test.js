import React from 'react';
import ReactDOM from 'react-dom';
import { SlackMessages } from '../slack/SlackMessages';

const userObjects = [

];

const parsedMessages = [

]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlackMessages loading={false} messages={parsedMessages} userObjects={userObjects}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});