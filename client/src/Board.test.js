import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Board } from './Board';

describe('Board', () => {
  let container = null;
  let board = null;

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
    act(() => {
      render(<Board squares={Array(9).fill(null)} />, container);
    });
    unmountComponentAtNode(container);
  });

  describe('renderSquare', () => {
    it('renders a square', () => {
      act(() => {
        board = render(<Board squares={Array(9).fill('T')} />, container);
      });
      expect(board.renderSquare(0)).toMatchSnapshot();
    });
  });
});
