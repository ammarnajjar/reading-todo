import PropTypes from 'prop-types';
import React from 'react';

class Square extends React.Component<{ value: string }> {
  static propTypes = {
    value: PropTypes.string,
  };
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}

interface BoardState {
  squares: string[];
}

class Board extends React.Component<any, BoardState> {
  static propTypes = {
    squares: PropTypes.array,
  };
  constructor(props: BoardState) {
    super(props);
    this.state = {
      squares: Array(9).fill('null'),
    };
  }
  render() {
    const status = 'Next Player: X';
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
    return;
  }

  renderSquare(i: number): any {
    const value = this.state.squares[i];
    return <Square key={i} value={value} />;
  }
}

const App: React.FunctionComponent = () => {
  return <Board />;
};

export default App;
