import React from 'react';
import PropTypes from 'prop-types';
import './Square.css';

export class Square extends React.Component {
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}

Square.propTypes = {
  value: PropTypes.number
};
