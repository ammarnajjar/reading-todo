import { shallow } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BooksTable } from './books-table';
import { BookInDB } from './models';

describe('BooksTable Element', () => {
  let container: Element | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container === null) {
      return;
    }
    unmountComponentAtNode(container);
    container.remove();
    container == null;
  });

  it('renders without a modal', () => {
    render(<BooksTable books={[]} />, container);
    expect(container?.querySelector('.modal')).toBeNull();
  });

  it('opens and closes the modal with buttons', () => {
    render(<BooksTable books={[]} />, container);
    (container?.querySelector('#modalBtn') as HTMLElement).click();
    expect(container?.querySelector('.modal')).toBeDefined();
    (container?.querySelector('#closeBtn') as HTMLElement).click();
    expect(container?.querySelector('.modal')).toBeNull();
  });

  it('removes a book when delete is clicked', () => {
    render(<BooksTable books={[]} />, container);
    (container?.querySelector('#modalBtn') as HTMLElement).click();
    (container?.querySelector('#add') as HTMLElement).click();
    (container?.querySelector('#closeBtn') as HTMLElement).click();
    expect(container?.querySelector('.bookRow')).toBeDefined();
    (container?.querySelector('#delete_0') as HTMLElement).click();
    expect(container?.querySelector('.bookRow')).toBeNull();
  });
});

describe('BooksTable Class', () => {
  const mockBooksInDb: BookInDB[] = [
    { id: 0, title: 'title 0', author: 'author 0', handleDelete: () => {} },
    { id: 1, title: 'title 1', author: 'author 1', handleDelete: () => {} },
  ];
  const mockBook = { title: 'mockTitle', author: 'mockAuthor' };
  let component: any;
  let oat: BooksTable;

  beforeEach(() => {
    component = shallow(<BooksTable books={mockBooksInDb} />);
    oat = component.instance() as BooksTable;
  });

  describe('showModal', () => {
    it('sets showModal in state to true', () => {
      oat.setState({ showModal: false });
      oat.showModal();
      expect(oat.state.showModal).toBe(true);
    });
  });

  describe('hideModal', () => {
    it('sets showModal in state to false', () => {
      oat.setState({ showModal: true });
      oat.hideModal();
      expect(oat.state.showModal).toBe(false);
    });
  });

  describe('onBookDeleted', () => {
    it('removes the book from state', () => {
      oat.setState({ books: mockBooksInDb });
      oat.onBookDeleted(0);
      expect(oat.state.books.map(book => book.id)).not.toContain(0);
    });
  });

  describe('onBookAdded', () => {
    it('adds a book to state', () => {
      oat.setState({ books: mockBooksInDb });
      oat.onBookAdded(mockBook);
      const actualTitles = oat.state.books.map(book => book.title);
      const actualAuthors = oat.state.books.map(book => book.author);
      expect(actualTitles).toContain(mockBook.title);
      expect(actualAuthors).toContain(mockBook.author);
    });
  });
});
