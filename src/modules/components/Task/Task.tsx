import * as block from 'bem-cn';
import * as React from 'react';
import * as InlineSvg from 'svg-inline-react';
import { bind } from 'decko';
import { ITask } from 'modules/redux/namespace';
import { IconButton, Button } from 'react-toolbox/lib/button';
import { editIcon, deleteIcon } from 'assets/img';
import DeleteTask from 'modules/components/DeleteTask/DeleteTask';
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import './Task.styl';

const b = block('task');

interface ITaskProps {
  listId: string;
  taskId: string;
  status: 'needsAction' | 'completed';
  title: string;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
  updateTask(params: { taskListId: string; taskId: string; text: string; }): void;
  deleteTask(params: { taskListId: string; taskId: string; }): void;
}

interface ITaskState {
  isEditing: boolean;
  taskText: string;
  deletingTaskDialogShow: boolean;
}

export default class Task extends React.PureComponent<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isEditing: false,
      taskText: this.props.title,
      deletingTaskDialogShow: false,
    };
  }

  public render() {
    return(
      this.state.isEditing ?
        (
          <div>
            <Input
              type="text"
              label="Enter your task"
              name="task"
              value={this.state.taskText}
              onChange={this.editingHandle}
              maxLength={50}
            />
            <Button
              label="Save"
              onClick={this.editTask}
            />
            <Button
              label="Cancel"
              onClick={this.editToggle}
            />
          </div>
        )
      :
        (
          <div className={b()}>
            <Checkbox
              className={b('checkbox')()}
              checked={this.props.status === 'completed' ? true : false}
              onChange={this.taskStatusUpdater}
            />
            <IconButton
              neutral={false}
              className={b('edit-icon')()}
              onClick={this.editToggle}
            >
              <InlineSvg src={editIcon} />
            </IconButton>
            <IconButton
              neutral={false}
              className={b('edit-icon')()}
              onClick={this.dialogToggle}
            >
              <InlineSvg src={deleteIcon} />
              <DeleteTask
                listId={this.props.listId}
                taskId={this.props.taskId}
                dialogToggle={this.dialogToggle}
                deletingTaskDialogShow={this.state.deletingTaskDialogShow}
                deleteTask={this.props.deleteTask}
              />
            </IconButton>
            <span className={b('text-field')()}>{this.props.title}</span>
          </div>
        )
    );
  }

  @bind
  private editToggle() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  @bind
  private editTask() {
    this.props.updateTask({
      taskListId: this.props.listId,
      taskId: this.props.taskId,
      text: this.state.taskText,
    });
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  @bind
  private editingHandle(e: string) {
    this.setState({
      taskText: e,
    });
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

  @bind
  private dialogToggle() {
    this.setState({
      deletingTaskDialogShow: !this.state.deletingTaskDialogShow,
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
