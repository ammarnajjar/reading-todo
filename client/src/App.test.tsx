import { mount } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { App, Board } from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
    unmountComponentAtNode(div);
  });
});

describe('Board', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<Board />, div);
    unmountComponentAtNode(div);
  });
  it('has # text initially', () => {
    const wrapper = mount(<Board />);
    const squares = wrapper.find('.square');
    expect(squares).toHaveLength(9);
    squares.forEach(s => expect(s.text()).toBe('#'));
  });
  it('switches X and O on clicks', () => {
    const wrapper = mount(<Board />);
    const squares = wrapper.find('.square');

    squares.at(0).simulate('click');
    expect(squares.at(0).text()).toBe('X');

    squares.at(0).simulate('click');
    expect(squares.at(0).text()).toBe('O');

    squares.slice(1).forEach(s => expect(s.text()).toBe('#'));
  });
});
