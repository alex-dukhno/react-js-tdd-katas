import React from 'react';
import uuidv1 from 'uuid/v1';

class TodoList extends React.Component {
  state = {
    taskTitle: '',
    tasks: []
  };

  onTaskTitleChange = (e) => {
    this.setState({ taskTitle: e.target.value });
  };

  onTaskSubmit = (e) => {
    e.preventDefault();

    this.setState((prev, props) => {
      const tasks = prev.tasks;
      tasks.push(prev.taskTitle);
      return { tasks, taskTitle: '' };
    });
  };

  render() {
    return (
      <form>
        <ul>
          {this.state.tasks.map(title => <Task key={uuidv1()} title={title} />)}
        </ul>
        <input
          data-cy-id="task-title"
          onChange={this.onTaskTitleChange}
          value={this.state.taskTitle}
        />
        <button
          data-cy-id="submit-task"
          onClick={this.onTaskSubmit}
        >
          Submit task
        </button>
      </form>
    )
  }
}

class Task extends React.PureComponent {
  render() {
    return (<li data-cy-type="task">{this.props.title}</li>);
  }
}

export default TodoList;
