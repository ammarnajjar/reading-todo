import React from 'react';
import PropTypes from 'prop-types';
import './Square.css';

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

Square.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
};
