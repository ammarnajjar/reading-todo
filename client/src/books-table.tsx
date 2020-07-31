import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import { BookEdit } from './book-edit';
import { BookElement } from './book-element';
import { AddModal } from './modal';
import { Book, BookInDB, BooksTableProps } from './models';

export class BooksTable extends React.Component<
  BooksTableProps,
  { showModal: boolean; books: BookInDB[]; currentId: number }
> {
  static proptTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
  };
  constructor(props: BooksTableProps) {
    super(props);
    this.state = {
      books: props.books,
      currentId: 0,
      showModal: false,
    };
  }

  showModal(): void {
    this.setState({ showModal: true });
  }

  hideModal(): void {
    this.setState({ showModal: false });
  }

  onBookDeleted(bookId: number): void {
    console.log('onBookDeleted -> bookId', bookId);
    const books = this.state.books.filter(book => book.id !== bookId);
    this.setState({ books });
  }

  onBookAdded = (book: Book) => {
    const books = [
      {
        id: this.state.currentId,
        title: book.title,
        author: book.author,
        handleDelete: () => {},
      },
      ...this.state.books,
    ];
    this.setState({
      books,
      currentId: this.state.currentId + 1,
    });
  };

  renderBook(book: BookInDB): ReactElement {
    return (
      <BookElement
        key={book.id}
        id={book.id}
        author={book.author}
        title={book.title}
        handleDelete={() => this.onBookDeleted(book.id)}
      />
    );
  }

  renderAddButton(): ReactElement {
    return (
      <Button
        className="p-3"
        variant="primary"
        onClick={() => this.showModal()}
      >
        New Book
      </Button>
    );
  }

  renderBooksTable(): ReactElement {
    return (
      <Container fluid className="p-3">
        <Jumbotron>
          <Row>
            <Col sm={9}>
              <h1 className="header">Book List</h1>
            </Col>
            <Col sm={3}>{this.renderAddButton()}</Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col className="m-1">
            <span className="align-middle">
              <strong>Title</strong>
            </span>
          </Col>
          <Col className="m-1">
            <span className="align-middle">
              <strong>Author</strong>
            </span>
          </Col>
          <Col className="m-1"></Col>
        </Row>
        {this.state.books.map(book => this.renderBook(book))}
      </Container>
    );
  }

  renderModal(): ReactElement | null {
    if (this.state.showModal) {
      return (
        <AddModal
          show={this.state.showModal}
          handleClose={() => this.hideModal()}
        >
          <BookEdit
            onBookAdded={this.onBookAdded}
            onBookDeleted={this.onBookDeleted}
          />
        </AddModal>
      );
    } else {
      return null;
    }
  }

  render(): ReactElement {
    return (
      <Container fluid>
        {this.renderModal()}
        {this.renderBooksTable()}
      </Container>
    );
  }
}
