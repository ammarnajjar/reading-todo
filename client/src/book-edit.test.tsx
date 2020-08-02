import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BookEdit } from './book-edit';
import { mockBook } from './test/data/book.mock';

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
    it('renders without crashing', () => {
      render(
        <BookEdit onBookAdded={() => {}} onBookDeleted={() => {}} />,
        container,
      );
    });
  });
});

describe('BookEdit mounted', () => {
  const dumyLambda = () => {};
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
