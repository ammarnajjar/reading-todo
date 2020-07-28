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
  const originalState = { title: '', author: '' };
  const dumyLambda = () => {};
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
      expect(oat.state).toEqual(originalState);
    });
  });
  describe('bookTitle input', () => {
    it('changes title in state according to its content change', () => {
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
      oat.setState(mockBook);
      component.find('button').simulate('click');
      expect(oat.state).toEqual(originalState);
    });
  });
});
