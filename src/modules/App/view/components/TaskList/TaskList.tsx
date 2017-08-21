import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { ITaskList, ITask } from 'modules/redux/namespace';
import Task from 'features/crudTask/view/Task';
import CreateItemDialog from 'shared/view/components/CreateItemDialog/CreateItemDialog';
import * as InlineSvg from 'svg-inline-react';
import { addBlackIcon } from 'shared/view/img';
import IconButton from 'react-toolbox/lib/button';
import './TaskList.styl';

const b = block('task-list');

interface IListsProps {
  id: string;
  taskLists: ITaskList[];
  tasks: ITask[];
  loadTasks(taskListId: string): void;
  createTask(params: { taskListId: string; text: string; }): void;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
  updateTask(params: { taskListId: string; taskId: string; text: string; }): void;
  deleteTask(params: { taskListId: string; taskId: string; }): void;
}

interface IListsState {
  taskDialogShow: boolean;
}

export default class Lists extends React.PureComponent<IListsProps, {}> {
  public state: IListsState = {
    taskDialogShow: false,
  };

  public componentWillMount(): void {
    this.props.loadTasks(this.props.id);
  }

  public componentWillReceiveProps(nextProprs: IListsProps): void {
    if (this.props.id !== nextProprs.id) {
      this.props.loadTasks(nextProprs.id);
    }
  }

  public render(): JSX.Element {
    const listIndex = this.props.taskLists.findIndex((item) => item.id === this.props.id);
    return(
      <div className={b()}>
        <h1>{this.props.taskLists[listIndex].title}</h1>
        <IconButton
          neutral={false}
          className={b('icon-button')()}
          onClick={this.dialogToggle}
        >
          <InlineSvg src={addBlackIcon} className={b('icon')()}/>
          <CreateItemDialog
            listId={this.props.id}
            dialogToggle={this.dialogToggle}
            tasksListDialogShow={this.state.taskDialogShow}
            createTask={this.props.createTask}
          />
        </IconButton>
        <h2 className={b('tasks')()}>Tasks</h2>
        <div className={b()}>
          {this.renderTasks()}
        </div>
      </div>
    );
  }

  @bind
  private renderTasks(): JSX.Element[] {
    return this.props.tasks.map((task: ITask) => (
        <div key={task.id}>
          <Task
            listId={this.props.id}
            taskId={task.id}
            status={task.status}
            title={task.title}
            updateTaskStatus={this.props.updateTaskStatus}
            updateTask={this.props.updateTask}
            deleteTask={this.props.deleteTask}
          />
        </div>
      ),
    );
  }

  @bind
  private dialogToggle(): void {
    this.setState({ taskDialogShow: !this.state.taskDialogShow });
  }
}
