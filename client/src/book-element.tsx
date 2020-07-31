import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BookInDB } from './models';

export class BookElement extends React.Component<BookInDB> {
  render(): ReactElement {
    return (
      <Row>
        <Col className="m-1">
          <span className="align-middle">{this.props.title}</span>
        </Col>
        <Col className="m-1">
          <span className="align-middle">{this.props.author}</span>
        </Col>
        <Col className="m-1">
          <Button
            id={`delete_${this.props.id}`}
            onClick={this.props.handleDelete}
            size="sm"
            variant="outline-danger"
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
}
