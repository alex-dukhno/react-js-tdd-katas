import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import TodoList from '../kata';

configure({ adapter: new Adapter() });

should();

describe('todo list', () => {
  let list;
  let taskTitle;
  let taskSubmit;

  beforeEach(() => {
    list = mount(<TodoList />);
    taskTitle = list.find('input[data-cy-id="task-title"]');
    taskSubmit = list.find('button[data-cy-id="submit-task"]');
  });

  const event = (value) => {
    return {
      preventDefault: () => {},
      target: { value }
    }
  };

  const submitTask = (title) => {
    taskTitle.simulate('change', event(title));
    taskSubmit.simulate('click', event());
  };

  it('creates a task', () => {
    submitTask('task title');

    const tasks = list.find('li[data-cy-type="task"]');

    tasks.should.have.length(1);
    tasks.map(task => task.text()).should.eql(['task title']);
  });

  it('creates many tasks', () => {
    submitTask('task title #1');
    submitTask('task title #2');
    submitTask('task title #3');

    const tasks = list.find('li[data-cy-type="task"]');

    tasks.should.have.length(3);
    tasks.map(task => task.text()).should.eql(['task title #1', 'task title #2', 'task title #3']);
  });
});
