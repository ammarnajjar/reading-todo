import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { Game } from './Game';
import { shallow } from 'enzyme';

describe('Game', () => {
  let container = null;
  let game = null;

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
      render(<Game />, container);
    });
    unmountComponentAtNode(container);
  });

  it('is initialized with a state of null array squares and X is next', () => {
    game = new Game();
    const history = [{ squares: Array(9).fill(null) }];
    const stepNumber = 0;
    const xIsNext = true;
    expect(game.state).toEqual({ history, stepNumber, xIsNext });
  });

  describe('jumpTo', () => {
    it('changes the state to the jumped Step', () => {
      const history = [
        { squares: ['X', 'O', 'X', 'O', ...Array(5).fill(null)] },
        { squares: ['X', 'O', 'X', ...Array(6).fill(null)] },
        { squares: ['X', 'O', ...Array(7).fill(null)] },
        { squares: ['X', ...Array(8).fill(null)] },
        { squares: [...Array(9).fill(null)] },
      ];
      const expectedState = {
        history,
        stepNumber: 3,
        xIsNext: false,
      };
      const state = {
        history,
        stepNumber: 4,
        xIsNext: true,
      };
      game = shallow(<Game />);
      game.setState(state);
      game.instance().jumpTo(3);
      expect(game.instance().state).toEqual(expectedState);
    });
  });

  describe('handleClick', () => {
    it('stops if there square already filled', () => {
      let expectedState = null;
      act(() => {
        game = render(<Game />, container);
        game.state.history = [{ squares: ['X', ...Array(8).fill(null)] }];
        expectedState = { ...game.state };
        game.handleClick(0);
      });
      expect(game.state).toEqual(expectedState);
    });
    it('stops if there is a winner', () => {
      let expectedState = null;
      act(() => {
        game = render(<Game />, container);
        game.state.history = [
          {
            squares: ['X', 'X', 'X', ...Array(6).fill(null)],
          },
        ];
        expectedState = { ...game.state };
        game.handleClick(1);
      });
      expect(game.state).toEqual(expectedState);
    });
    it('shows an X when square is clicked', () => {
      act(() => {
        game = render(<Game />, container);
        game.handleClick(1);
      });
      const expectedState = {
        history: [
          { squares: [...Array(9).fill(null)] },
          { squares: [null, 'X', ...Array(7).fill(null)] },
        ],
        stepNumber: 1,
        xIsNext: false,
      };
      expect(game.state).toEqual(expectedState);
      expect(container.querySelector('.status').textContent).toBe(
        'Next Player: O'
      );
    });
    it('switches to show an O when second square is clicked', () => {
      act(() => {
        game = render(<Game />, container);
      });
      const expectedState = {
        history: [
          { squares: [...Array(9).fill(null)] },
          { squares: ['X', ...Array(8).fill(null)] },
          { squares: ['X', 'O', ...Array(7).fill(null)] },
        ],
        stepNumber: 2,
        xIsNext: true,
      };
      game.handleClick(0);
      game.handleClick(1);
      expect(game.state).toEqual(expectedState);
      expect(container.querySelector('.status').textContent).toBe(
        'Next Player: X'
      );
    });
  });

  describe('render', () => {
    it('shows a board', () => {
      act(() => {
        game = render(<Game />, container);
      });
      expect(container.querySelector('.game-board')).not.toBeNull();
    });
    it('shows winner status if X is a winner', () => {
      game = render(<Game />, container);
      game.state = {
        history: [{ squares: ['X', 'X', ...Array(7).fill(null)] }],
        stepNumber: 2,
        xIsNext: true,
      };
      game.handleClick(2);
      expect(container.querySelector('.status').textContent).toBe('Winner: X');
    });
    it('shows winner status if O is a winner', () => {
      game = render(<Game />, container);
      game.state = {
        history: [{ squares: ['O', 'O', ...Array(7).fill(null)] }],
        stepNumber: 2,
        xIsNext: false,
      };
      game.handleClick(2);
      expect(container.querySelector('.status').textContent).toBe('Winner: O');
    });
  });
  describe('integration', () => {
    it('shows Go to start after click on first li element', () => {
      act(() => {
        game = render(<Game />, container);
        container.querySelector('li').click();
      });
      expect(container.querySelector('li').textContent).toEqual(
        'Go to game start'
      );
    });
    it('shows travel in time to game start when clicked on first button in ol', () => {
      game = render(<Game />, container);
      container.querySelectorAll('.square').forEach(button => button.click());
      container.querySelector('[data-testid="move-0"]>button').click();
      expect(findSquare(container, 1).textContent).toEqual('');
    });
    it('shows travel in time to move 2 when clicked on Go to move #2', () => {
      game = render(<Game />, container);
      container.querySelectorAll('.square').forEach(button => button.click());
      container.querySelector('[data-testid="move-2"]>button').click();
      expect(findSquare(container, 1).textContent).toEqual('X');
      expect(findSquare(container, 2).textContent).toEqual('O');
      expect(findSquare(container, 3).textContent).toEqual('');
    });
    it('shows travel in time to move 2 when clicked on Go to move #1 then Go to move #2', () => {
      game = render(<Game />, container);
      container.querySelectorAll('.square').forEach(button => button.click());
      container.querySelector('[data-testid="move-1"]>button').click();
      container.querySelector('[data-testid="move-2"]>button').click();
      expect(findSquare(container, 1).textContent).toEqual('X');
      expect(findSquare(container, 2).textContent).toEqual('O');
      expect(findSquare(container, 3).textContent).toEqual('');
    });
    it('shows render an X after first clicked on a square', () => {
      game = render(<Game />, container);
      findSquare(container, 2).click();
      expect(findSquare(container, 2).textContent).toEqual('X');
    });
    it('shows render an O after second clicked on a square', () => {
      game = render(<Game />, container);
      findSquare(container, 2).click();
      findSquare(container, 3).click();
      expect(findSquare(container, 3).textContent).toEqual('O');
    });
  });
});

function findSquare(container, index) {
  return container.querySelector(`.square:nth-child(${index})`);
}
