import { Book, BookInDB } from '../../models';

export const mockBooksInDb: BookInDB[] = [
  {
    id: 0,
    isbn: '1235',
    year: 1234,
    category: '',
    title: 'title 0',
    author: 'author 0',
    handleDelete: () => {},
  },
  {
    id: 1,
    isbn: '1236',
    year: 1235,
    category: '',
    title: 'title 1',
    author: 'author 1',
    handleDelete: () => {},
  },
];

export const mockBook: Book = {
  isbn: '1235',
  title: 'title 0',
  author: 'author 0',
  year: '1234',
  category: '',
};
