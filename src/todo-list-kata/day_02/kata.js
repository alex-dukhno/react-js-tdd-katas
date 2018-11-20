import React from 'react';

class TodoList extends React.Component {
  state = {
    tasks: []
  };

  onChange = (e) => {
    const val = e.target.value;
    this.setState((prev, props) => ({ taskName: val }));
  };

  onTaskSubmit = () => {
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
    const tasks = this.state.tasks.map((task, index) => (<li id={'key-'+index} key={index}>{task}</li>));
    return (
      <div id='todo-list'>
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
      </div>
    )
  }
}

export default TodoList;
