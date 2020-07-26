import React from 'react';
import { BooksTable } from './books-table';
import { BookInDB } from './models';

const books: BookInDB[] = [
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
