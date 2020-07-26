import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import './modal.css';

export class Modal extends React.Component<{
  handleClose: () => void;
  children: ReactElement | null;
}> {
  static proptTypes = {
    handleClose: PropTypes.func,
    children: PropTypes.element,
  };
  render(): ReactElement {
    return (
      <div className="modal">
        <section className="modal-main">
          {this.props.children}
          <button id="closeBtn" onClick={this.props.handleClose}>
            close
          </button>
        </section>
      </div>
    );
  }
}
