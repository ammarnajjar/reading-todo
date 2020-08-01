import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BookEdit } from './book-edit';

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
  const mockBook = { title: 'title', author: 'author' };
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
  describe('bookTitle input', () => {
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
  describe('add button', () => {
    it('does not reset the state', () => {
      oat.setState(mockBook);
      component.find('#add').simulate('click');
      expect(oat.state).toEqual(mockBook);
    });
  });
});
