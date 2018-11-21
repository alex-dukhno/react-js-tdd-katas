import React from 'react';

class TodoList extends React.Component {
  state = {
    tasks: [],
    taskName: ''
  };

  onChange = (e) => {
    e.preventDefault();

    const val = e.target.value;
    this.setState((prev, props) => ({ taskName: val }));
  };

  onTaskSubmit = (e) => {
    e.preventDefault();

    this.setState((prev, props) => {
      const tasks = prev.tasks;
      tasks.push(prev.taskName);
      return {
        tasks: tasks,
        taskName: ''
      };
    })
  };

  render() {
    const tasks = this.state.tasks.map((task, index) => <Task key={index} title={task} />);
    return (
      <form id='todo-list'>
        <ul>{tasks}</ul>
        <input
          id='task-name'
          type='text'
          onChange={this.onChange}
          value={this.state.taskName}
        />
        <button
          id='submit-task'
          onClick={this.onTaskSubmit}
        />
      </form>
    )
  }
}

class Task extends React.Component {
  render() {
    return <li key={this.props.id}>{this.props.title}</li>
  }
}

export default TodoList;
