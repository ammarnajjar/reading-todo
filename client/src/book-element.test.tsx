import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BookElement } from './book-element';

describe('BookElement', () => {
  it('renders without crashing', () => {
    const container = document.createElement('div');
    render(
      <BookElement author="" title="" id={99} handleDelete={() => {}} />,
      container,
    );
    unmountComponentAtNode(container);
  });
});
