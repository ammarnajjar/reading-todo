import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Board, calculateWinner } from './Board';
import { Square } from './Square';

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
      render(<Board />, container);
    });
    unmountComponentAtNode(container);
  });

  it('is initialized with a state of null array squares and X is next', () => {
    board = new Board();
    const squares = Array(9).fill(null);
    const xIsNext = true;
    expect(board.state).toEqual({ squares, xIsNext });
  });

  describe('handleClick', () => {
    it('stops if there square already filled', () => {
      let expectedState = null;
      act(() => {
        board = render(<Board />, container);
        board.state.squares = ['X', ...Array(8).fill(null)];
        expectedState = { ...board.state };
        board.handleClick(0);
      });
      expect(board.state).toEqual(expectedState);
    });
    it('stops if there is a winner', () => {
      let expectedState = null;
      act(() => {
        board = render(<Board />, container);
        board.state.squares = ['X', 'X', 'X', ...Array(6).fill(null)];
        expectedState = { ...board.state };
        board.handleClick(1);
      });
      expect(board.state).toEqual(expectedState);
    });
    it('shows an X when square is clicked', () => {
      act(() => {
        board = render(<Board />, container);
        board.handleClick(1);
      });
      const expectedState = {
        squares: [null, 'X', ...Array(7).fill(null)],
        xIsNext: false,
      };
      expect(board.state).toEqual(expectedState);
      expect(container.querySelector('.status').textContent).toBe(
        'Next Player: O'
      );
    });
    it('switches to show an O when second square is clicked', () => {
      act(() => {
        board = render(<Board />, container);
      });
      const expectedState = {
        squares: ['X', 'O', ...Array(7).fill(null)],
        xIsNext: true,
      };
      board.handleClick(0);
      board.handleClick(1);
      expect(board.state).toEqual(expectedState);
      expect(container.querySelector('.status').textContent).toBe(
        'Next Player: X'
      );
    });
  });
  describe('renderSquare', () => {
    it('renders a square', () => {
      act(() => {
        board = render(<Board />, container);
        board.state.squares = ['X', ...Array(8).fill(null)];
      });
      expect(board.renderSquare(0)).toMatchSnapshot();
    });
  });
  describe('render', () => {
    it('shows winner status if X is a winner', () => {
      act(() => {
        board = render(<Board />, container);
        board.state = {
          squares: ['X', 'X', ...Array(7).fill(null)],
          xIsNext: true,
        };
        board.handleClick(2);
      });
      expect(container.querySelector('.status').textContent).toBe('Winner: X');
    });
    it('shows winner status if O is a winner', () => {
      act(() => {
        board = render(<Board />, container);
        board.state = {
          squares: ['O', 'O', ...Array(7).fill(null)],
          xIsNext: false,
        };
        board.handleClick(2);
      });
      expect(container.querySelector('.status').textContent).toBe('Winner: O');
    });
  });
});

describe('calculateWinner', () => {
  const mockSquares = Array(9).fill(null);
  it('returns null initially', () => {
    expect(calculateWinner(mockSquares)).toBeNull();
  });

  it('returns null for a no win situation', () => {
    const mockNoWin = [['X', 'O', 'X'], ...mockSquares];
    expect(calculateWinner(mockNoWin)).toBeNull();
  });

  it('returns winning square for a win situation', () => {
    const mockWin = ['X', 'X', 'X', ...mockSquares];
    expect(calculateWinner(mockWin)).toEqual('X');
  });
});
