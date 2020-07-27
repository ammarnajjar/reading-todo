import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Modal } from './modal';

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
      <Modal handleClose={() => {}}>
        <p>Child</p>
      </Modal>,
      container,
    );
  });
});
