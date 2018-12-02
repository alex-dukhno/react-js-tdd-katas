import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import TodoList from '../kata';

configure({ adapter: new Adapter() });
should();

describe('todo list', () => {
  let list;
  let taskTitleInput;
  let submitTaskButton;

  beforeEach(() => {
    list = mount(<TodoList />);
    taskTitleInput = list.find('input[data-cy-id="task-title"]');
    submitTaskButton = list.find('button[data-cy-id="submit-task"]');
  });

  const submitTask = (taskTitle) => {
    taskTitleInput.simulate('change', { target: { value: taskTitle } });
    submitTaskButton.simulate('click');
  };

  describe('with single task', () => {
    beforeEach(() => {
      submitTask('task title #1');
    });

    const task = () => list.find('li[data-cy-type="task"]');
    const taskTitle = () => task().find('span[data-cy-type="title"]').text();
    const taskStatus = () => task().find('span[data-cy-type="status"]').text();
    const taskMarkInProgressButton = () => task().find('button[data-cy-type="mark-in-progress"]');
    const taskMarkAsDoneButton = () => task().find('button[data-cy-type="mark-as-done"]');

    it('has a title', () => {
      taskTitle().should.eql('task title #1');
    });

    it('has "TODO" status', () => {
      taskStatus().should.eql('TODO');
    });

    it('has enabled "mark in progress" button', () => {
      taskMarkInProgressButton().props().disabled.should.be.false;
    });

    it('has "In Progress" status when "mark in progress" button clicked', () => {
      taskMarkInProgressButton().simulate('click');

      taskStatus().should.eql('In Progress');
    });

    it('has disabled "mark in progress" button once it clicked', () => {
      taskMarkInProgressButton().simulate('click');

      taskMarkInProgressButton().props().disabled.should.be.true;
    });

    it('has disabled "mark as done" button when in "TODO" status', () => {
      taskMarkAsDoneButton().props().disabled.should.be.true;
    });

    it('has enabled "mark as done" button when in "In Progress" status', () => {
      taskMarkInProgressButton().simulate('click');

      taskMarkAsDoneButton().props().disabled.should.be.false;
    });

    it('has "DONE" status when "mark as done" button clicked', () => {
      taskMarkInProgressButton().simulate('click');
      taskMarkAsDoneButton().simulate('click');

      taskStatus().should.eql('DONE');
    });

    it('has disabled "mark in progress" and "mark as done" once task in "DONE" status', () => {
      taskMarkInProgressButton().simulate('click');
      taskMarkAsDoneButton().simulate('click');

      taskMarkInProgressButton().props().disabled.should.be.true;
      taskMarkAsDoneButton().props().disabled.should.be.true;
    });
  });

  it('submits many tasks', () => {
    submitTask('task title #1');
    submitTask('task title #2');
    submitTask('task title #3');

    const tasks = list.find('span[data-cy-type="title"]');

    tasks.should.have.length(3);
    tasks.map(task => task.text()).should.eql(['task title #1', 'task title #2', 'task title #3']);
  });
});
