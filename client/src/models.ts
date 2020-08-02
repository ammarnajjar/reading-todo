export interface Book {
  isbn: string;
  title: string;
  author: string;
  category: string;
  year: string;
}

export interface BookInDB {
  isbn: string;
  id: number;
  title: string;
  author: string;
  category: string;
  year: number;
  handleDelete: () => void;
}

export interface BooksTableProps {
  books: BookInDB[];
}
