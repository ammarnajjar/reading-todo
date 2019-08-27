import React from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';
import './Board.css';

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {[0, 3, 6].map(j => (
          <div key={j} className="board-row">
            {[j, j + 1, j + 2].map(i => this.renderSquare(i))}
          </div>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.array,
  onClick: PropTypes.func,
};
