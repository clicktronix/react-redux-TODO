import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button/';
import Input from 'react-toolbox/lib/input';
import './CreateTaskList.styl';

interface IDiadlogActions {
  label: string;
  onClick(): void;
}

interface IProps {
  tasksListDialogShow: boolean;
  listId?: string;
  onSuccess(): void;
  dialogToggle(): void;
  createTaskList({ title }: { title: string }): void;
}

interface IState {
  inputText: string;
}

export default class CreateTaskList extends React.Component<IProps, IState> {
  public state: IState = {
    inputText: '',
  };

  public render(): JSX.Element {
    const actions: IDiadlogActions[] = [
      { label: 'Cancel', onClick: this.handleDialogClose },
      {
        label: 'Save',
        onClick: this.handleSubmitCreateTaskListDialog,
      },
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          active={this.props.tasksListDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title={this.props.listId ? 'Enter your task' : 'Enter your tasklist title'}
        >
          <Input
            type="title"
            label="Name"
            name="title"
            value={this.state.inputText}
            onChange={this.handleChange}
            maxLength={this.props.listId ? 50 : 20}
          />
        </Dialog>
      </div>
    );
  }

  @bind
  private handleSubmitCreateTaskListDialog(): void {
    const title = this.state.inputText;
    if (this.props.createTaskList) {
      this.props.createTaskList({ title });
      this.props.onSuccess();
    }
    this.props.dialogToggle();
  }

  @bind
  private handleDialogClose(): void {
    this.setState({ inputText: '' });
    this.props.dialogToggle();
  }

  @bind
  private handleChange(e: string): void {
    this.setState({
      inputText: e,
    });
  }
}
