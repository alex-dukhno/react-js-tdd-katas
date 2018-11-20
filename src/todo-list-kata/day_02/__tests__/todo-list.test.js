import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import TodoList from '../kata';

configure({ adapter: new Adapter() });

should();

describe('todo list', () => {
  let list;

  beforeEach(() => {
    list = shallow(<TodoList />);
  });

  it('submits a task to a list', () => {
    const taskName = list.find('#task-name');
    const submitTask = list.find('#submit-task');

    taskName.simulate('change', { target: { value: 'task name' } });
    submitTask.simulate('click');

    const tasks = list.find('li');

    tasks.should.have.length(1);
    tasks.map(task => task.text()).should.eql(['task name']);
  });

  it('submits many tasks to a list', () => {
    const taskName = list.find('#task-name');
    const submitTask = list.find('#submit-task');

    taskName.simulate('change', { target: { value: 'task name #1' } });
    submitTask.simulate('click');

    taskName.simulate('change', { target: { value: 'task name #2' } });
    submitTask.simulate('click');

    taskName.simulate('change', { target: { value: 'task name #3' } });
    submitTask.simulate('click');

    const tasks = list.find('li');

    tasks.should.have.length(3);
    tasks.map(task => task.text()).should.eql(['task name #1', 'task name #2', 'task name #3'])
  });
});
