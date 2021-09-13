import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { App } from './App';

describe('App', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
    unmountComponentAtNode(div);
  });
});
