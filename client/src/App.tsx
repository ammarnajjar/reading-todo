import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BaseState {
  books: Book[];
}

export class BookElement extends React.Component<Book, Book> {
  deleteBook(): void {
    console.log(`deleting book ${this.props.title}`);
  }
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>
          <button onClick={() => this.deleteBook()}>Delete</button>
        </td>
      </tr>
    );
  }
}

class Modal extends React.Component<{
  show: boolean;
  handleClose: any;
  children: any;
}> {
  static proptTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.element,
  };
  render() {
    const showHideClassName = this.props.show
      ? 'modal display-block'
      : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={this.props.handleClose}>close</button>
        </section>
      </div>
    );
  }
}

export class BookEdit extends React.Component<{}, {}> {
  addBook(): void {
    console.log('adding a book');
  }
  render() {
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
        <tbody>
          <tr>
            <td>
              <input type="text" id="bookId" name="bookId" />
            </td>
            <td>
              <input type="text" id="bookTitle" name="bookTitle" />
            </td>
            <td>
              <input type="text" id="bookAuthor" name="bookAuthor" />
            </td>
            <td>
              <button onClick={() => this.addBook()}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export class BooksTable extends React.Component<
  BaseState,
  { showModal: boolean; books: Book[] }
> {
  static proptTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
  };
  constructor(props: BaseState) {
    super(props);
    this.state = {
      books: props.books,
      showModal: false,
    };
  }
  showModal(): void {
    this.setState({ showModal: true });
  }
  hideModal(): void {
    this.setState({ showModal: false });
  }
  addBook() {
    console.log('adding a book');
    this.showModal();
  }
  renderBook(book: Book) {
    return (
      <BookElement
        key={book.id}
        id={book.id}
        author={book.author}
        title={book.title}
      />
    );
  }
  render() {
    return (
      <div className="base">
        <Modal show={this.state.showModal} handleClose={() => this.hideModal()}>
          <BookEdit />
        </Modal>
        <button onClick={() => this.showModal()}>Add Book</button>
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
      </div>
    );
  }
}

const books: Book[] = [
  {
    id: 1,
    author: 'auth1',
    title: 'title1',
  },
  {
    id: 2,
    author: 'auth2',
    title: 'This is a very long book title for testing',
  },
  {
    id: 999999,
    author: 'This is a very long book author name for testing',
    title: 'title3',
  },
];

export const App: React.FunctionComponent = () => {
  return <BooksTable books={books} />;
};
