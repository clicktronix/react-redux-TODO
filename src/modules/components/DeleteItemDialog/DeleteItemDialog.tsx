import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button/';

interface IDiadlogActions {
  label: string;
  onClick(): void;
}

interface ICreateTasksListProps {
  listId: string;
  deletingDialogShow: boolean;
  taskId?: string;
  dialogToggle(): void;
  deleteTask?(params: { taskListId: string; taskId: string; }): void;
  deleteTaskList?(taskListId: string): void;
}

export default class CreateTaskList extends React.Component<ICreateTasksListProps, {}> {
  public render(): JSX.Element {
    const actions: IDiadlogActions[] = [
      { label: 'Cancel', onClick: this.handleDialogClose },
      {
        label: 'Delete',
        onClick: this.props.taskId ? this.handleDeleteTask : this.handleDeleteTaskList,
      },
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          active={this.props.deletingDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title="Do you wanna delete this?"
        />
      </div>
    );
  }

  @bind
  private handleDeleteTask(): void {
    if (this.props.taskId && this.props.deleteTask) {
      this.props.deleteTask({
        taskListId: this.props.listId,
        taskId: this.props.taskId,
      });
    }
    this.props.dialogToggle();
  }

  @bind
  private handleDeleteTaskList(): void {
    if (this.props.deleteTaskList) {
      this.props.deleteTaskList(this.props.listId);
    }
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose(): void {
    this.props.dialogToggle();
  }
}
