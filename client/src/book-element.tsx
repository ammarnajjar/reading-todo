import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { BookInDB } from './models';

export class BookElement extends React.Component<BookInDB> {
  addCol(text: string): ReactElement {
    return (
      <td>
        <span className="align-middle">{text}</span>
      </td>
    );
  }
  render(): ReactElement {
    return (
      <tr>
        {this.addCol(this.props.isbn)}
        {this.addCol(this.props.title)}
        {this.addCol(this.props.author)}
        {this.addCol(this.props.year.toString())}
        {this.addCol(this.props.category)}
        <td className="text-right">
          <Button
            id={`delete_${this.props.id}`}
            onClick={this.props.handleDelete}
            size="sm"
            variant="outline-danger"
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
