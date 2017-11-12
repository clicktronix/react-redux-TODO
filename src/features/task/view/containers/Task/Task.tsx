import * as block from 'bem-cn';
import * as React from 'react';
import * as InlineSvg from 'svg-inline-react';
import { bind } from 'decko';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IconButton, Button } from 'react-toolbox/lib/button';
import { editIcon, deleteIcon } from 'shared/view/img';
import DeleteItemDialog from 'shared/view/components/DeleteItemDialog/DeleteItemDialog';
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import { IAppReduxState } from 'shared/types/app';
import './Task.styl';

const b = block('task');

interface IOwnProps {
  listId: string;
  taskId: string;
  status: 'needsAction' | 'completed';
  title: string;
  onComplete(id: string): void;
}

export interface IDispatchProps {
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
  updateTask(params: { taskListId: string; taskId: string; text: string; }): void;
  deleteTask(params: { taskListId: string; taskId: string; }): void;
}

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    updateTask: actions.updateTask,
    updateTaskStatus: actions.updateTaskStatus,
    deleteTask: actions.deleteTask,
  }, dispatch);
}

interface IState {
  isEditing: boolean;
  taskText: string;
  deletingTaskDialogShow: boolean;
}

type IProps = IOwnProps & IDispatchProps;

class Task extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isEditing: false,
    taskText: this.props.title,
    deletingTaskDialogShow: false,
  };

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props !== nextProps) {
      this.props.onComplete(this.props.listId);
    }
  }

  public render(): JSX.Element {
    const { status, listId, taskId, title, deleteTask } = this.props;
    const { taskText, isEditing, deletingTaskDialogShow } = this.state;

    return(
      isEditing
      ?
        (
          <div>
            <Input
              type="text"
              label="Enter your task"
              name="task"
              value={taskText}
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
              checked={status === 'completed' ? true : false}
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
              <DeleteItemDialog
                listId={listId}
                taskId={taskId}
                dialogToggle={this.dialogToggle}
                deletingDialogShow={deletingTaskDialogShow}
                deleteTask={deleteTask}
              />
            </IconButton>
            <span className={b('text-field')()}>{title}</span>
          </div>
        )
    );
  }

  @bind
  private editToggle(): void {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  @bind
  private editTask(): void {
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
  private editingHandle(e: string): void {
    this.setState({
      taskText: e,
    });
  }

  @bind
  private taskStatusUpdater(): void {
    const status = this.taskStatusChecker();
    this.props.updateTaskStatus({
      taskListId: this.props.listId,
      taskId: this.props.taskId,
      isCompleted: status,
    });
  }

  @bind
  private dialogToggle(): void {
    this.setState({
      deletingTaskDialogShow: !this.state.deletingTaskDialogShow,
    });
  }

  @bind
  private taskStatusChecker(): boolean {
    if (this.props.status === 'needsAction') {
      return true;
    } else if (this.props.status === 'completed') {
      return false;
    }
    throw new Error('Task status error');
  }
}

const connectedTask = connect<{}, IDispatchProps, IOwnProps>(
  mapDispatch,
)(Task);

export default connectedTask;
export { Task };
