import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BookEdit, isISBNValid, isYearValid } from './book-edit';
import { mockBook } from './test/data/book.mock';

const dumyLambda = () => {};

describe('BookEdit Element', () => {
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

  describe('render', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders without crashing', () => {
      render(
        <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
        container,
      );
    });
  });
});

describe('BookEdit mounted', () => {
  const event = {
    target: { value: 'mockEvent' },
  };
  let component: ShallowWrapper;
  let oat: BookEdit;
  beforeEach(() => {
    component = shallow(
      <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
    );
    oat = component.instance() as BookEdit;
  });
  describe('addBook', () => {
    it('calls onBookAdded with the book from state', () => {
      oat.setState(mockBook);
      oat.addBook();
      expect(oat.state).toEqual(mockBook);
    });

    it('alerts if year is not valid', () => {
      jest.spyOn(window, 'alert').mockImplementation(dumyLambda);
      oat.setState({ ...mockBook, year: '0' });
      oat.addBook();
      expect(window.alert).toHaveBeenCalledWith('Year enterd is not valid!');
    });

    it('alerts if isbn is not valid', () => {
      jest.spyOn(window, 'alert').mockImplementation(dumyLambda);
      oat.setState({ ...mockBook, isbn: 'a' });
      oat.addBook();
      expect(window.alert).toHaveBeenCalledWith('ISBN enterd is not valid!');
    });
  });
  describe('isbn input', () => {
    it('changes isbntitle in state according to its content change', () => {
      oat.setState(mockBook);
      component.find('#isbn').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, isbn: 'mockEvent' });
    });
  });
  describe('year input', () => {
    it('changes year in state according to its content change', () => {
      oat.setState(mockBook);
      component.find('#year').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, year: 'mockEvent' });
    });
  });
  describe('title input', () => {
    it('changes title in state according to its content change', () => {
      oat.setState(mockBook);
      component.find('#title').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, title: 'mockEvent' });
    });
  });
  describe('bookAuthor input', () => {
    it('changes author in state according to its content change', () => {
      oat.setState(mockBook);
      component.find('#author').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, author: 'mockEvent' });
    });
  });
  describe('category input', () => {
    it('changes category in state according to its content change', () => {
      oat.setState(mockBook);
      component.find('#category').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, category: 'mockEvent' });
    });
  });
  describe('add button', () => {
    it('does not reset the state', () => {
      oat.setState(mockBook);
      component.find('#add').simulate('click');
      expect(oat.state).toEqual(mockBook);
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
