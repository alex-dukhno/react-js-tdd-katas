import React from 'react';
import uuidv1 from 'uuid/v1';

class TodoList extends React.Component {
  state = {
    taskName: '',
    tasks: []
  };

  onTaskTitleChange = (e) => {
    const value = e.target.value;
    this.setState((prev, props) => ({ taskName: value }));
  };

  onTaskSubmit = (e) => {
    e.preventDefault();

    this.setState((prev, props) => {
      const tasks = prev.tasks;
      tasks.push(prev.taskName);

      return { taskName: '', tasks: tasks };
    })
  };

  render() {
    return (
      <div data-cy-id="todo-list">
        <ul>
          {this.state.tasks.map(task => <Task key={uuidv1()} title={task} />)}
        </ul>
        <form>
          <input
            data-cy-id="task-title"
            onChange={this.onTaskTitleChange}
            value={this.state.taskName}
          />
          <button
            data-cy-id="submit-task"
            onClick={this.onTaskSubmit}>
            Submit task
          </button>
        </form>
      </div>
    )
  }
}

class Task extends React.Component {
  render() {
    return <li data-cy-type="task">{this.props.title}</li>
  }
}

export default TodoList;
