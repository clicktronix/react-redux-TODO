import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button/';
import Input from 'react-toolbox/lib/input';

interface IDiadlogActions {
  label: string;
  onClick(): void;
}

interface ICreateTasksListState {
  title: string;
}

interface ICreateTasksListProps {
  tasksListDialogShow: boolean;
  createTaskList({ title }: { title: string }): void;
  dialogToggle(): void;
}

export default class CreateTaskList extends React.Component<ICreateTasksListProps, ICreateTasksListState> {
  constructor(props: ICreateTasksListProps) {
    super(props);
    this.state = {
      title: '',
    };
  }

  public render() {
    const actions: IDiadlogActions[] = [
      { label: 'Cancel', onClick: this.handleDialogClose },
      { label: 'Save', onClick: this.handleSubmitDialog },
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          active={this.props.tasksListDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title="Enter the name of your task list"
        >
          <Input
            type="text"
            label="Name"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            maxLength={30}
          />
        </Dialog>
      </div>
    );
  }

  @bind
  private handleSubmitDialog() {
    const title = this.state.title;
    this.props.createTaskList({ title });
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose() {
    this.setState({ title: '' });
    this.props.dialogToggle();
  }

  @bind
  private handleChange(e: string) {
    this.setState({
      title: e,
    });
  }
}
