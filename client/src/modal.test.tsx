import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AddModal } from './modal';

describe('Modal', () => {
  let container: Element | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container === null) {
      return;
    }
    unmountComponentAtNode(container as Element);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    render(
      <AddModal show={true} handleClose={() => {}}>
        <p>Child</p>
      </AddModal>,
      container,
    );
  });
});
