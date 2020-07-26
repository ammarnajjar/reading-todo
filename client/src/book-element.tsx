import React, { ReactElement } from 'react';
import { BookInDB } from './models';

export class BookElement extends React.Component<BookInDB> {
  render(): ReactElement {
    return (
      <tr className="bookRow">
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>
          <button
            id={`delete_${this.props.id}`}
            onClick={this.props.handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
