import React from 'react';
import { configure, mount } from 'enzyme';
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

  it('submits many tasks', () => {
    submitTask('task title $1');
    submitTask('task title $2');
    submitTask('task title $3');

    const tasks = list.find('li[data-cy-type="task"]');

    tasks.should.have.length(3);
    tasks.map(task => task.find('span[data-cy-type="title"]').text())
      .should.eql(['task title $1', 'task title $2', 'task title $3']);
  });

  describe('with single task', () => {
    beforeEach(() => {
      submitTask('task title $1');
    });

    const task = () => list.find('li[data-cy-type="task"]').first();
    const taskStatus = () => task().find('span[data-cy-type="task-status"]').text();
    const markInProgressButton = () => task().find('button[data-cy-type="mark-in-progress"]');
    const markAsDoneButton = () => task().find('button[data-cy-type="mark-as-done"]');

    it('submitted task has "TODO" status', () => {
      taskStatus().should.eql('TODO');
    });

    it('has enabled "mark in progress" button', () => {
      markInProgressButton().props().disabled.should.be.false;
    });

    it('has disabled "mark in progress" button once it is clicked', () => {
      markInProgressButton().simulate('click');
      markInProgressButton().props().disabled.should.be.true;
    });

    it('has "In Progress" status once "mark in progress" is clicked', () => {
      markInProgressButton().simulate('click');
      taskStatus().should.eql('In Progress');
    });

    it('has disabled "mark as done" button', () => {
      markAsDoneButton().props().disabled.should.be.true;
    });

    it('has enabled "mark as done" button once "mark in progress" is clicked', () => {
      markInProgressButton().simulate('click');
      markAsDoneButton().props().disabled.should.be.false;
    });

    it('has "DONE" status once "mark as done" is clicked', () => {
      markInProgressButton().simulate('click');
      markAsDoneButton().simulate('click');
      taskStatus().should.eql('DONE');
    });

    it('has "mark in progress" and "mark as done" buttons disabled once it in "DONE" status', () => {
      markInProgressButton().simulate('click');
      markAsDoneButton().simulate('click');

      markInProgressButton().props().disabled.should.be.true;
      markAsDoneButton().props().disabled.should.be.true;
    });
  });
});
