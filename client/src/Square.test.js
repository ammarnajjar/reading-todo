import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Square } from './Square';

describe('Board', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    render(<Square />, container);
    unmountComponentAtNode(container);
  });
});
