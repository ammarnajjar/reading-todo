import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { BooksTable, isISBNValid, isYearValid } from './books-table';
import { mockBook, mockBooksInDb } from './test/data/book.mock';

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
    (document.body.getElementsByClassName('modal')[0] as HTMLElement).click();
    const modals = document.body.getElementsByClassName('modal-content');
    expect(modals.length).toBe(0);
  });

  it('removes a book when delete is clicked', () => {
    render(<BooksTable books={[]} />, container);
    (container?.querySelector('button.p-3') as HTMLElement).click();

    const isbnInput = document.body.getElementsByTagName(
      'input',
    )[0] as HTMLInputElement;
    const yearInput = document.body.getElementsByTagName(
      'input',
    )[1] as HTMLInputElement;
    isbnInput.value = '1234';
    yearInput.value = '1234';
    ReactTestUtils.Simulate.change(isbnInput);
    ReactTestUtils.Simulate.change(yearInput);

    (document.body
      .getElementsByClassName('modal-body')[0]
      .getElementsByClassName('btn')[0] as HTMLButtonElement).click();
    (document.body.getElementsByClassName('close')[0] as HTMLElement).click();
    expect(container?.querySelector('tbody tr')).not.toBeNull();
    (container?.querySelector('#delete_0') as HTMLElement).click();
    expect(container?.querySelector('.bookRow')).toBeNull();
  });
});

describe('BooksTable Class', () => {
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

    it('alerts if year is not valid', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      oat.setState({ books: mockBooksInDb });
      oat.onBookAdded({ ...mockBook, year: '0' });
      expect(window.alert).toHaveBeenCalledWith('Year enterd is not valid!');
    });

    it('alerts if isbn is not valid', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      oat.setState({ books: mockBooksInDb });
      oat.onBookAdded({ ...mockBook, isbn: 'a' });
      expect(window.alert).toHaveBeenCalledWith('ISBN enterd is not valid!');
    });
  });
});

describe('isYearValid', () => {
  it('returns false for string not equal to 4 in length', () => {
    expect(isYearValid('12345')).toBe(false);
    expect(isYearValid('123')).toBe(false);
  });
  it('returns false for year less than 1000', () => {
    expect(isYearValid('0900')).toBe(false);
  });
  it('returns false for year in the future', () => {
    expect(isYearValid('9999')).toBe(false);
  });
  it('returns false for empty string', () => {
    expect(isYearValid('')).toBe(false);
  });
  it('returns true for year between 1000 and today', () => {
    expect(isYearValid('1001')).toBe(true);
  });
});

describe('isISBNValid', () => {
  it('returns false for non numbers after removing the dashes', () => {
    expect(isISBNValid('12a-34')).toBe(false);
  });
  it('returns true for numbers and dashes', () => {
    expect(isISBNValid('12-34')).toBe(true);
  });
  it('returns true for numbers', () => {
    expect(isISBNValid('1234')).toBe(true);
  });
  it('returns true for empty ISBN', () => {
    expect(isISBNValid('')).toBe(true);
  });
});
