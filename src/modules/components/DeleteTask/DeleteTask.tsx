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
  taskId: string;
  deletingTaskDialogShow: boolean;
  deleteTask(params: { taskListId: string; taskId: string; }): void;
  dialogToggle(): void;
}

export default class CreateTaskList extends React.Component<ICreateTasksListProps, {}> {
  public render() {
    const actions: IDiadlogActions[] = [
      { label: 'Cancel', onClick: this.handleDialogClose },
      { label: 'Delete', onClick: this.handleSubmitDialog },
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          active={this.props.deletingTaskDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title="Do you wanna delete this task?"
        />
      </div>
    );
  }

  @bind
  private handleSubmitDialog() {
    this.props.deleteTask({
      taskListId: this.props.listId,
      taskId: this.props.taskId,
    });
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose() {
    this.props.dialogToggle();
  }
}
