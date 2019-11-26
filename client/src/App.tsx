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
  render() {
    return (
      <div className="book">
        <span>{this.props.id}</span>
        <span>{this.props.title}</span>
        <span>{this.props.author}</span>
      </div>
    );
  }
}

export class Base extends React.Component<BaseState, BaseState> {
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
        {this.state.books.map(book => this.renderBook(book))}
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
    title: 'title2',
  },
  {
    id: 3,
    author: 'auth3',
    title: 'title3',
  },
];

export const App: React.FunctionComponent = () => {
  return <Base books={books} />;
};
