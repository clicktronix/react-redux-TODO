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

interface ICreateTaskProps {
  listId: string;
  tasksListDialogShow: boolean;
  dialogToggle(): void;
  createTask(params: { taskListId: string; text: string; }): void;
}

interface ICreateTaskState {
  text: string;
}

export default class CreateTaskList extends React.Component<ICreateTaskProps, ICreateTaskState> {
  constructor(props: ICreateTaskProps) {
    super(props);
    this.state = {
      text: '',
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
          title="Enter your task"
        >
          <Input
            type="text"
            label="Name"
            name="title"
            value={this.state.text}
            onChange={this.handleChange}
            maxLength={50}
          />
        </Dialog>
      </div>
    );
  }

  @bind
  private handleSubmitDialog() {
    const text = this.state.text;
    const taskListId = this.props.listId;
    this.props.createTask({ taskListId, text });
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose() {
    this.setState({ text: '' });
    this.props.dialogToggle();
  }

  @bind
  private handleChange(e: string) {
    this.setState({
      text: e,
    });
  }
}
