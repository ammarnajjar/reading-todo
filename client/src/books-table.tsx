import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import { BookEdit } from './book-edit';
import { BookElement } from './book-element';
import { Modal } from './modal';
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
      <button id="modalBtn" onClick={() => this.showModal()}>
        Add Book
      </button>
    );
  }

  renderBooksTable(): ReactElement {
    return (
      <table className="books">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{this.state.books.map(book => this.renderBook(book))}</tbody>
      </table>
    );
  }

  renderModal(): ReactElement | null {
    if (this.state.showModal) {
      return (
        <Modal handleClose={() => this.hideModal()}>
          <BookEdit
            onBookAdded={this.onBookAdded}
            onBookDeleted={this.onBookDeleted}
          />
        </Modal>
      );
    } else {
      return null;
    }
  }

  render(): ReactElement {
    return (
      <div className="base">
        {this.renderModal()}
        {this.renderAddButton()}
        {this.renderBooksTable()}
      </div>
    );
  }
}
