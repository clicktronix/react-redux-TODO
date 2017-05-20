import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { ITaskList, ITask } from 'modules/redux/namespace';
import TaskList from 'modules/components/TaskList/TaskList';
import CreateTask from 'modules/components/CreateTask/CreateTask';
import * as InlineSvg from 'svg-inline-react';
import { addBlackIcon } from 'assets/img';
import IconButton from 'react-toolbox/lib/button';
import './Lists.styl';

const b = block('lists');

interface IListsProps {
  id: string;
  taskLists: ITaskList[];
  tasks: ITask[];
  loadTasks(taskListId: string): void;
  createTask(params: { taskListId: string; text: string; }): void;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
}

interface IListsState {
  taskDialogShow: boolean;
}

export default class Lists extends React.PureComponent<IListsProps, IListsState> {
  constructor(props: IListsProps) {
    super();
    this.state = {
      taskDialogShow: false,
    };
  }
  public render() {
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
          <CreateTask
            listId={this.props.id}
            dialogToggle={this.dialogToggle}
            tasksListDialogShow={this.state.taskDialogShow}
            createTask={this.props.createTask}
          />
        </IconButton>
        <h2 className={b('tasks')()}>Tasks</h2>
        <TaskList
          listId={this.props.id}
          loadTasks={this.props.loadTasks}
          tasks={this.props.tasks}
          updateTaskStatus={this.props.updateTaskStatus}
        />
      </div>
    );
  }

  @bind
  private dialogToggle() {
    this.setState({ taskDialogShow: !this.state.taskDialogShow });
  }
}
