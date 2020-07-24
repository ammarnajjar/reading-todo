import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import './App.css';

interface Book {
  id: number;
  title?: string;
  author?: string;
  handleDelete: () => void;
}

interface BaseState {
  books: Book[];
}

export class BookElement extends React.Component<Book, Book> {
  render(): ReactElement {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>
          <button onClick={this.props.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

class Modal extends React.Component<{
  show: boolean;
  handleClose: () => void;
  children: ReactElement | null;
}> {
  static proptTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.element,
  };
  render(): ReactElement {
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

export class BookEdit extends React.Component<
  {
    onBookAdded: (book: Partial<Book>) => void;
    onBookDeleted: (bookId: number) => void;
  },
  Partial<Book>
> {
  static proptTypes = {
    onBookAdded: PropTypes.func,
    onBookDeleted: PropTypes.func,
  };
  constructor(props: {
    onBookAdded: (book: Partial<Book>) => void;
    onBookDeleted: (bookId: number) => void;
  }) {
    super(props);
    this.state = {
      title: '',
      author: '',
    };
  }
  addBook(): void {
    console.log('adding a book');
    const book: Partial<Book> = {
      title: this.state.title,
      author: this.state.author,
    };
    console.log(book);
    this.props.onBookAdded(book);
    this.setState({
      title: '',
      author: '',
    });
  }
  render(): ReactElement {
    return (
      <table className="books">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                id="bookAuthor"
                name="bookAuthor"
                value={this.state.author}
                onChange={e => this.setState({ author: e.target.value })}
              />
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
  { showModal: boolean; books: Book[]; currentId: number }
> {
  static proptTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
  };
  constructor(props: BaseState) {
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
  addBook() {
    console.log('adding a book');
    this.showModal();
  }
  onBookDeleted(bookId: number): void {
    this.setState({
      books: this.state.books.filter(book => book.id !== bookId),
    });
  }
  onBookAdded = (book: Partial<Book>) => {
    this.setState({
      books: [
        { ...book, id: this.state.currentId, handleDelete: () => {} },
        ...this.state.books,
      ],
      currentId: this.state.currentId + 1,
    });
  };
  renderBook(book: Book) {
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
  render(): ReactElement {
    return (
      <div className="base">
        <Modal show={this.state.showModal} handleClose={() => this.hideModal()}>
          <BookEdit
            onBookAdded={this.onBookAdded}
            onBookDeleted={this.onBookDeleted}
          />
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
  // {
  //   id: 1,
  //   author: 'auth1',
  //   title: 'title1',
  // },
  // {
  //   id: 2,
  //   author: 'auth2',
  //   title: 'This is a very long book title for testing',
  // },
  // {
  //   id: 999999,
  //   author: 'This is a very long book author name for testing',
  //   title: 'title3',
  // },
];

export const App: React.FunctionComponent = () => {
  return <BooksTable books={books} />;
};
