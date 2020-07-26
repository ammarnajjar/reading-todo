import { shallow } from 'enzyme';
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
  const originalState = { title: '', author: '' };
  const dumyLambda = () => {};
  describe('addBook', () => {
    it('calls onBookAdded with the book from state', () => {
      const oat = shallow(
        <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
      ).instance() as BookEdit;
      oat.setState(mockBook);
      oat.addBook();
      expect(oat.state).toEqual(originalState);
    });
  });
  describe('bookTitle input', () => {
    it('changes title in state according to its content change', () => {
      const component = shallow(
        <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
      );
      const oat = component.instance() as BookEdit;
      oat.setState(mockBook);
      const event = {
        target: { value: 'mockTitle' },
      };
      component.find('#bookTitle').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, title: 'mockTitle' });
    });
  });
  describe('bookAuthor input', () => {
    it('changes author in state according to its content change', () => {
      const component = shallow(
        <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
      );
      const oat = component.instance() as BookEdit;
      oat.setState(mockBook);
      const event = {
        target: { value: 'mockAuthor' },
      };
      component.find('#bookAuthor').simulate('change', event);
      expect(oat.state).toEqual({ ...mockBook, author: 'mockAuthor' });
    });
  });
  describe('add button', () => {
    it('resets the state', () => {
      const component = shallow(
        <BookEdit onBookAdded={dumyLambda} onBookDeleted={dumyLambda} />,
      );
      const oat = component.instance() as BookEdit;
      oat.setState(mockBook);
      component.find('button').simulate('click');
      expect(oat.state).toEqual(originalState);
    });
  });
});
