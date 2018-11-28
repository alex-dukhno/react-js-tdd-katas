import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import TodoList from '../kata';

configure({ adapter: new Adapter() });
should();

describe('todo list', () => {
  let list;
  let input;
  let button;

  beforeEach(() => {
    list = mount(<TodoList />);
    input = list.find('input[data-cy-id="task-title"]');
    button = list.find('button[data-cy-id="submit-task"]');
  });

  const submitTask = (taskTitle) => {
    input.simulate('change', { target: { value: taskTitle } });
    button.simulate('click');
  };

  describe('task', () => {
    beforeEach(() => {
      submitTask('task title #1');
    });

    const task = () => list.find('li[data-cy-type="task"]').first();
    const title = () => task().find('span[data-cy-type="title"]');
    const status = () => task().find('span[data-cy-type="status"]');
    const markInProgressButton = () => task().find('button[data-cy-type="mark-in-progress"]');
    const markAsDoneButton = () => task().find('button[data-cy-type="mark-as-done"]');

    it('has title', () => {
      title().text().should.eql('task title #1');
    });

    it('has "TODO" status in the beginning', () => {
      status().text().should.eql('TODO');
    });

    it('has enabled "mark in progress" button', () => {
      markInProgressButton().props().disabled.should.be.false;
    });

    it('has disabled "done" button', () => {
      markAsDoneButton().props().disabled.should.be.true;
    });

    it('has status "In Progress" when "mark in progress" button clicked', () => {
      markInProgressButton().simulate('click');

      status().text().should.eql('In Progress');
    });

    it('has "mark in progress" button disabled once it has "In Progress" status', () => {
      markInProgressButton().simulate('click');

      markInProgressButton().props().disabled.should.be.true;
    });

    it('has "mark as done" button enabled once it has "In Progress" status', () => {
      markInProgressButton().simulate('click');

      markAsDoneButton().props().disabled.should.be.false;
    });

    it('has status "Done" when "mark as done" button clicked', () => {
      markInProgressButton().simulate('click');
      markAsDoneButton().simulate('click');

      status().text().should.eql('Done');
    });

    it('has "mark as done" button and "mark as done" disabled once it has "Done" status', () => {
      markInProgressButton().simulate('click');
      markAsDoneButton().simulate('click');

      markInProgressButton().props().disabled.should.be.true;
      markAsDoneButton().props().disabled.should.be.true;
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
