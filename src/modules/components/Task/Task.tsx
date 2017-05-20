import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { ITask } from 'modules/redux/namespace';
import Checkbox from 'react-toolbox/lib/checkbox';
import './Task.styl';

const b = block('task');

interface ITaskProps {
  listId: string;
  taskId: string;
  status: 'needsAction' | 'completed';
  title: string;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
}

interface ITaskState {
  isEditing: boolean;
}

export default class Task extends React.PureComponent<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  public render() {
    return(
      <div className={b()}>
        <Checkbox
          className={b('checkbox')()}
          checked={this.props.status === 'completed' ? true : false}
          onChange={this.taskStatusUpdater}
        />
        <span className={b('text-field')()}>{this.props.title}</span>
      </div>
    );
  }

  @bind
  private taskStatusUpdater() {
    const status = this.taskStatusChecker();
    this.props.updateTaskStatus({
      taskListId: this.props.listId,
      taskId: this.props.taskId,
      isCompleted: status,
    });
  }

  private taskStatusChecker() {
    if (this.props.status === 'needsAction') {
      return true;
    } else if (this.props.status === 'completed') {
      return false;
    }
    throw new Error('Task status error');
  }
}
