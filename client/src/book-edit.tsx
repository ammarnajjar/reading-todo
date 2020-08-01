import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Book } from './models';

export interface PropsModel {
  onBookAdded: (book: Book) => void;
  onBookDeleted: (bookId: number) => void;
}

export class BookEdit extends React.Component<PropsModel, Book> {
  static proptTypes = {
    onBookAdded: PropTypes.func,
    onBookDeleted: PropTypes.func,
  };
  constructor(props: PropsModel) {
    super(props);
    this.state = {
      title: '',
      author: '',
    };
  }

  addBook(): void {
    const book: Book = {
      title: this.state.title,
      author: this.state.author,
    };
    console.log('addBook -> book', book);
    this.props.onBookAdded(book);
  }

  addCol(id: string, placeHolder: string, onChange: (e: any) => void) {
    return (
      <Col>
        <Form.Control
          type="text"
          placeholder={placeHolder}
          id={id}
          onChange={onChange}
        />
      </Col>
    );
  }

  render(): ReactElement {
    return (
      <Form>
        <Form.Row>
          {this.addCol('title', 'Title', e =>
            this.setState({ title: e.target.value }),
          )}
          {this.addCol('author', 'Author', e =>
            this.setState({ author: e.target.value }),
          )}
          <Button variant="primary" id="add" onClick={() => this.addBook()}>
            Add
          </Button>
        </Form.Row>
      </Form>
    );
  }
}
