import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Book } from './models';

export function isYearValid(year: string): boolean {
  const yearAsNumber = Number(year);
  if (isNaN(yearAsNumber) || year.length !== 4) {
    return false;
  }
  if (yearAsNumber < 1000 || yearAsNumber > new Date().getFullYear()) {
    return false;
  }
  return true;
}

export function isISBNValid(isbn: string): boolean {
  if (isbn === '') {
    return true;
  }
  if (isNaN(Number(isbn.replace('-', '')))) {
    return false;
  }
  return true;
}

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
      isbn: '',
      title: '',
      author: '',
      category: '',
      year: '',
    };
  }

  addBook(): void {
    if (!isYearValid(this.state.year)) {
      alert('Year enterd is not valid!');
      return;
    }
    if (!isISBNValid(this.state.isbn)) {
      alert('ISBN enterd is not valid!');
      return;
    }
    const book: Book = {
      isbn: this.state.isbn,
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      year: this.state.year,
    };
    this.props.onBookAdded(book);
  }

  addCol(
    size: number,
    id: string,
    placeHolder: string,
    type: string,
    pattern: string,
    onChange: (e: any) => void,
    validation: ReactElement | null,
  ) {
    return (
      <Col sm={size}>
        <Form.Control
          type={type}
          placeholder={placeHolder}
          id={id}
          pattern={pattern}
          onChange={onChange}
        />
        {validation}
      </Col>
    );
  }

  render(): ReactElement {
    const gridWidth = 12;
    const isbnValidationError = isISBNValid(this.state.isbn) ? null : (
      <small className="text-danger">ISBN is not Valid</small>
    );

    const yearValidationError = isYearValid(this.state.year) ? null : (
      <small className="text-danger">Year is not Valid</small>
    );
    return (
      <Form>
        <Form.Group>
          <Form.Row className="m-2">
            {this.addCol(
              gridWidth * 0.75,
              'isbn',
              'ISBN',
              'text',
              '^[0-9|-]*$',
              e => this.setState({ isbn: e.target.value }),
              isbnValidationError,
            )}
            {this.addCol(
              gridWidth * 0.25,
              'year',
              'Year',
              'text',
              '^[0-9]{4}$',
              e => this.setState({ year: e.target.value }),
              yearValidationError,
            )}
          </Form.Row>
        </Form.Group>
        <Form.Group>
          {this.addCol(
            gridWidth,
            'title',
            'Title',
            'text',
            '.*',
            e => this.setState({ title: e.target.value }),
            null,
          )}
        </Form.Group>
        <Form.Group>
          {this.addCol(
            gridWidth,
            'author',
            'Author',
            'text',
            '.*',
            e => this.setState({ author: e.target.value }),
            null,
          )}
        </Form.Group>
        <Form.Group>
          {this.addCol(
            gridWidth,
            'category',
            'Category',
            'text',
            '.*',
            e => this.setState({ category: e.target.value }),
            null,
          )}
        </Form.Group>
        <Form.Group className="m-3">
          <Button
            block
            variant="primary"
            id="add"
            onClick={() => this.addBook()}
          >
            Add
          </Button>
        </Form.Group>
      </Form>
    );
  }
}
