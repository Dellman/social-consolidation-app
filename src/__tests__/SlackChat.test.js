import React from 'react';
import ReactDOM from 'react-dom';
import SlackChat from '../slack/SlackChat';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlackChat />, div);
  ReactDOM.unmountComponentAtNode(div);
});