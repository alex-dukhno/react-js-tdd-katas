import React from 'react';
import { shallow, configure } from 'enzyme';
import { should } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import TodoList from '../kata';

configure({ adapter: new Adapter() });
should();

describe('todo list', () => {
  it('renders an empty todo list', () => {
    const list = shallow(<TodoList />);

    list.find('#todo-list').should.exist;
    list.find('li').should.have.length(0);
  });

  it('submit a task', () => {
    const list = shallow(<TodoList />);

    const taskName = list.find('#taskName');
    const submitButton = list.find('#submitTask');

    taskName.simulate('change', { target: { value: 'task name' } } );
    submitButton.simulate('click');

    const tasks = list.find('li');
    tasks.should.have.length(1);
    tasks.map(task => task.text()).should.eql(['task name']);
  });
});
