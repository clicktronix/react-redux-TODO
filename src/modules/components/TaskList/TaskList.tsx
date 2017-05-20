import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { ITask } from 'modules/redux/namespace';
import Checkbox from 'react-toolbox/lib/checkbox';
import Task from '../Task/Task';
import './TaskList.styl';

const b = block('task-list');

interface ITaskListProps {
  listId: string;
  tasks: ITask[];
  loadTasks(taskListId: string): void;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
}

export default class TaskList extends React.PureComponent<ITaskListProps, {}> {
  public componentWillMount() {
    this.props.loadTasks(this.props.listId);
  }

  public render() {
    return(
      <div className={b()}>
        <h2>{this.renderTasks()}</h2>
      </div>
    );
  }

  @bind
  private renderTasks() {
    return this.props.tasks.map((task: ITask) => (
        <div key={task.id}>
          <Task
            listId={this.props.listId}
            taskId={task.id}
            status={task.status}
            title={task.title}
            updateTaskStatus={this.props.updateTaskStatus}
          />
        </div>
      ),
    );
  }
}
