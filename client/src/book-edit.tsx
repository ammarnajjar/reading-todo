import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
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
    this.setState({
      title: '',
      author: '',
    });
  }

  formTable(row: ReactElement) {
    return (
      <table className="books">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    );
  }

  titleInput(): ReactElement {
    return (
      <input
        type="text"
        id="bookTitle"
        name="bookTitle"
        value={this.state.title}
        onChange={e => this.setState({ title: e.target.value })}
      />
    );
  }

  authorInput(): ReactElement {
    return (
      <input
        type="text"
        id="bookAuthor"
        name="bookAuthor"
        value={this.state.author}
        onChange={e => this.setState({ author: e.target.value })}
      />
    );
  }

  addButton(): ReactElement {
    return (
      <button id="add" onClick={() => this.addBook()}>
        Add
      </button>
    );
  }

  render(): ReactElement {
    const rowForm = (
      <tr>
        <td>{this.titleInput()}</td>
        <td>{this.authorInput()}</td>
        <td>{this.addButton()}</td>
      </tr>
    );
    return this.formTable(rowForm);
  }
}
