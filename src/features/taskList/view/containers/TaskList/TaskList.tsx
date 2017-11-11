import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ITaskList, ITask } from 'shared/types/model';
import Task from 'features/task/view/Task';
import CreateTask from '../../components/CreateTask/CreateTask';
import * as InlineSvg from 'svg-inline-react';
import { addBlackIcon } from 'shared/view/img';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import IconButton from 'react-toolbox/lib/button';
import { IAppReduxState } from 'shared/types/app';
import './TaskList.styl';

const b = block('task-list');

interface IOwnProps {
  taskList: ITaskList;
  id: string;
}

interface IStateProps {
  tasks: ITask[];
}

export interface IDispatchProps {
  loadTasks(taskListId: string): void;
  createTask(params: { taskListId: string; text: string; }): void;
}

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    tasks: selectors.selectTasks(state),
  };
}

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    loadTasks: actions.loadTasks,
    createTask: actions.createTask,
  }, dispatch);
}

interface IState {
  taskDialogShow: boolean;
}

type IProps = IStateProps & IDispatchProps & IOwnProps;

class TaskList extends React.PureComponent<IProps> {
  public state: IState = {
    taskDialogShow: false,
  };

  public componentWillMount(): void {
    this.props.loadTasks(this.props.id);
  }

  public componentWillReceiveProps(nextProprs: IProps): void {
    if (this.props.id !== nextProprs.id) {
      this.props.loadTasks(nextProprs.id);
    }
  }

  public render(): JSX.Element {
    return(
      <div className={b()}>
        <h1>{this.props.taskList.title}</h1>
        <IconButton
          neutral={false}
          className={b('icon-button')()}
          onClick={this.dialogToggle}
        >
          <InlineSvg src={addBlackIcon} className={b('icon')()}/>
          <CreateTask
            onSuccess={this.props.loadTasks}
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
            onComplete={this.props.loadTasks}
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

const connectedTaskList = connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatch,
)(TaskList);

export default connectedTaskList;
export { TaskList };
