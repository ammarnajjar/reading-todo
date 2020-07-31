import React from 'react';
import './App.scss';
import { BooksTable } from './books-table';
import { BookInDB } from './models';

const books: BookInDB[] = [];

export const App: React.FunctionComponent = () => {
  return <BooksTable books={books} />;
};
