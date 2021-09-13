import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BookElement } from './book-element';

describe('BookElement', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const container = document.createElement('tbody');
    render(
      <BookElement
        isbn="1234"
        year={1234}
        category=""
        author=""
        title=""
        id={99}
        handleDelete={() => {}}
      />,
      container,
    );
    unmountComponentAtNode(container);
  });
});
