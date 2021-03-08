import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
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
    const books = this.state.books.filter(book => book.id !== bookId);
    this.setState({ books });
  }

  onBookAdded = (book: Book): void => {
    const books = [
      {
        id: this.state.currentId,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        category: book.category,
        year: Number(book.year),
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
        isbn={book.isbn}
        title={book.title}
        author={book.author}
        category={book.category}
        year={book.year}
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
            <Col>
              <h1 className="header">Book List</h1>
            </Col>
            <Col className="text-right">{this.renderAddButton()}</Col>
          </Row>
        </Jumbotron>
        <Container fluid>
          <Table responsive borderless hover striped size="sm">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.state.books.map(book => this.renderBook(book))}</tbody>
          </Table>
        </Container>
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
