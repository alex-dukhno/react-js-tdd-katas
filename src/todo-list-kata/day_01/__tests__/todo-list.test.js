import React from 'react';
import { shallow, configure } from 'enzyme';
import { should } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import TodoList from '../kata';

configure({ adapter: new Adapter() });
should();

describe('todo list', () => {
  it('renders todo list', () => {
    const list = shallow(<TodoList/>);

    list.find('div[id="todo-list"]').should.exist;
  });
});
