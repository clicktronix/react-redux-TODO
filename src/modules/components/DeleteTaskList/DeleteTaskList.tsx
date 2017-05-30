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
  deletingTaskListDialogShow: boolean;
  deleteTaskList(taskListId: string): void;
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
          active={this.props.deletingTaskListDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title="Do you wanna delete this tasklist?"
        />
      </div>
    );
  }

  @bind
  private handleSubmitDialog() {
    this.props.deleteTaskList(this.props.listId);
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose() {
    this.props.dialogToggle();
  }
}
