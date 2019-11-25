import PropTypes from 'prop-types';
import React from 'react';

class Square extends React.Component<{
  value: string;
  onClick: (event: any) => void;
}> {
  static propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
  };
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

interface BoardState {
  squares: string[];
  xIsNext: boolean;
}

export class Board extends React.Component<any, BoardState> {
  static propTypes = {
    squares: PropTypes.array,
  };
  constructor(props: BoardState) {
    super(props);
    this.state = {
      squares: Array(9).fill('#'),
      xIsNext: true,
    };
  }
  render() {
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    const status = `Next Player: ${nextPlayer}`;
    return (
      <div>
        <div className="status">{status}</div>
        {[0, 3, 6].map(i => (
          <div key={i} className="board-row">
            {[i, i + 1, i + 2].map(j => this.renderSquare(j))}
          </div>
        ))}
      </div>
    );
  }

  handleClick(i: number): void {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const xIsNext = !this.state.xIsNext;
    this.setState({
      squares: squares,
      xIsNext: xIsNext,
    });
  }

  renderSquare(i: number): any {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
}

export const App: React.FunctionComponent = () => {
  return <Board />;
};
