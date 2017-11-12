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

interface IProps {
  tasksListDialogShow: boolean;
  listId?: string;
  onSuccess(taskListId: string): void;
  dialogToggle(): void;
  createTask(params: { taskListId: string; text: string; }): void;
}

interface IState {
  inputText: string;
}

class CreateTask extends React.Component<IProps, IState> {
  public state: IState = {
    inputText: '',
  };

  public render(): JSX.Element {
    const actions: IDiadlogActions[] = [
      { label: 'Cancel', onClick: this.handleDialogClose },
      {
        label: 'Save',
        onClick: this.handleSubmitCreateTaskDialog,
      },
    ];
    const { tasksListDialogShow, listId } = this.props;
    const { inputText } = this.state;

    return (
      <div>
        <Dialog
          actions={actions}
          active={tasksListDialogShow}
          onEscKeyDown={this.handleDialogClose}
          onOverlayClick={this.handleDialogClose}
          title={listId ? 'Enter your task' : 'Enter your tasklist title'}
        >
          <Input
            type="title"
            label="Name"
            name="title"
            value={inputText}
            onChange={this.handleChange}
            maxLength={listId ? 50 : 20}
          />
        </Dialog>
      </div>
    );
  }

  @bind
  private handleSubmitCreateTaskDialog(): void {
    const text = this.state.inputText;
    const taskListId = this.props.listId;
    if (taskListId && this.props.createTask) {
      this.props.createTask({ taskListId, text });
      this.props.onSuccess(taskListId);
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

export default CreateTask;
