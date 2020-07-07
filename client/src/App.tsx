import PropTypes from 'prop-types';
import React from 'react';

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

export class BooksTable extends React.Component<BaseState, BaseState> {
  static proptTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
  };
  constructor(props: BaseState) {
    super(props);
    this.state = {
      books: props.books,
    };
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
        <button>Add Book</button>
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
