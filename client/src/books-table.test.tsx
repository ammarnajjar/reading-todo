import { shallow, ShallowWrapper } from 'enzyme';
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

  it('renders without a crash', () => {
    render(<BooksTable books={[]} />, container);
    // react modal in rendered outside the container
    // https://stackoverflow.com/a/35228926/3297680
    const modals = document.body.getElementsByClassName('modal-content');
    expect(modals.length).toBe(0);
  });

  it('opens and closes the modal with buttons', () => {
    render(<BooksTable books={[]} />, container);
    (container?.querySelector('button.p-3') as HTMLElement).click();
    const modal = document.body.getElementsByClassName('modal-content')[0];
    expect(modal).not.toBeNull();
    const modalBtn = document.body
      .getElementsByClassName('modal-footer')[0]
      .getElementsByClassName('btn')[0];
    (modalBtn as HTMLElement).click();
    const modals = document.body.getElementsByClassName('modal-content');
    expect(modals.length).toBe(0);
  });

  it('removes a book when delete is clicked', () => {
    render(<BooksTable books={[]} />, container);
    (container?.querySelector('button.p-3') as HTMLElement).click();
    (document.body
      .getElementsByClassName('modal-body')[0]
      .getElementsByClassName('btn')[0] as HTMLElement).click();
    (document.body
      .getElementsByClassName('modal-footer')[0]
      .getElementsByClassName('btn')[0] as HTMLElement).click();
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
  let component: ShallowWrapper;
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
