import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';

export class AddModal extends React.Component<{
  handleClose: () => void;
  children: ReactElement | null;
  show: boolean;
}> {
  static proptTypes = {
    handleClose: PropTypes.func,
    children: PropTypes.element,
    show: PropTypes.bool,
  };
  render(): ReactElement {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Book:</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
      </Modal>
    );
  }
}
