import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BookInDB } from './models';

export class BookElement extends React.Component<BookInDB> {
  addCol(text: string) {
    return (
      <Col className="m-1">
        <span className="align-middle">{text}</span>
      </Col>
    );
  }
  render(): ReactElement {
    return (
      <Row>
        {this.addCol(this.props.title)}
        {this.addCol(this.props.author)}
        <Col className="m-1 text-right">
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
