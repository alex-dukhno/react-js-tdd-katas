import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import TodoList from '../kata';

configure({ adapter: new Adapter() });

should();

describe('todo list', () => {
  let list;
  let taskName;
  let submitTask;

  beforeEach(() => {
    list = mount(<TodoList />);
    taskName = list.find('#task-name');
    submitTask = list.find('#submit-task');
  });

  const createTask = (taskTitle) => {
    taskName.simulate('change', { target: { value: taskTitle } });
    submitTask.simulate('click');
  }

  it('submits a task to a list', () => {
    createTask('task name');

    const tasks = list.find('li');

    tasks.should.have.length(1);
    tasks.map(task => task.text()).should.eql(['task name']);
  });

  it('submits many tasks to a list', () => {
    createTask('task name #1');
    createTask('task name #2');
    createTask('task name #3');

    const tasks = list.find('li');

    tasks.should.have.length(3);
    tasks.map(task => task.text()).should.eql(['task name #1', 'task name #2', 'task name #3'])
  });
});
