export interface Book {
  title: string;
  author: string;
}

export interface BookInDB {
  id: number;
  title: string;
  author: string;
  handleDelete: () => void;
}

export interface BooksTableProps {
  books: BookInDB[];
}
