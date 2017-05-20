import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
} from 'react-toolbox/lib/list';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { IReduxState } from 'shared/types/app';
import { loadTaskLists, createTaskList } from '../../redux/actions/TaskListsActions';
import { authorize } from 'modules/redux/actions/SessionActions';
import { loadTasks, updateTaskStatus, createTask } from 'modules/redux/actions/TasksActions';
import { Link } from 'react-router-dom';
import About from 'modules/containers/About/About';
import Lists from 'modules/containers/Lists/Lists';
import CreateTaskList from '../../components/CreateTaskList/CreateTaskList';
import { ITaskList, ITask } from 'modules/redux/namespace';
import { match } from 'react-router';
import * as InlineSvg from 'svg-inline-react';
import { infoIcon, listIcon, addIcon } from 'assets/img';
import './App.styl';

const b = block('app');

interface IAppProps {
  isLoggedIn: boolean;
  taskLists: ITaskList[];
  tasks: ITask[];
  loadTasks(taskListId: string): void;
  loadTaskLists(): void;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
  createTasksList( { title }: { title: string }): void;
  createTask(params: { taskListId: string; text: string; }): void;
  authorize(immediate: boolean): void;
}

interface IAppState {
  tasksListDialogShow: boolean;
  currentListId: string;
}

class App extends React.PureComponent<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      tasksListDialogShow: false,
      currentListId: '',
    };
  }

  public componentWillReceiveProps(nextProps: IAppProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.loadTaskLists();
    }
  }

  public render() {
    const ListsWrapper = ({ match }: { match: match<{ id: string; }>}) => {
      return (
        <Lists
          taskLists={this.props.taskLists}
          id={match.params.id}
          loadTasks={this.props.loadTasks}
          tasks={this.props.tasks}
          updateTaskStatus={this.props.updateTaskStatus}
          createTask={this.props.createTask}
        />
      );
    };

    return(
      <Router>
        <div className={b()}>
          <List selectable ripple >
            <h2 className={b('tasks-header-title')()}>Tasks navigation</h2>
            <ListDivider />
            <Link to="/about"  className={b('menu-section')()}>
              <InlineSvg src={infoIcon} className={b('icon')()} element="div" />
              <ListItem caption="About" className={b('list-title')()} />
            </Link>
            <ListSubHeader
              caption={this.props.isLoggedIn ? 'Your Google Tasks' : 'Log In with Google'}
            />
            {this.mapTasks()}
            {
              this.props.isLoggedIn ?
              (
                <div className={b('menu-section')()}>
                  <InlineSvg src={addIcon} className={b('icon')()} element="div" />
                  <ListItem
                    caption="Create new list"
                    className={b('list-title')()}
                    onClick={this.dialogToggle}
                  >
                    <CreateTaskList
                      dialogToggle={this.dialogToggle}
                      tasksListDialogShow={this.state.tasksListDialogShow}
                      createTasksList={this.props.createTasksList}
                    />
                  </ListItem>
                </div>
              ) : null
            }
            <ListDivider />
            <ListItem
              caption={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
              className={b('menu-section')()}
              onClick={this.loginHandle}
            />
          </List>
          <div className={b('tasks-section')()}>
            <Route path="/about" component={About as any} />
            <Route path="/:id" render={ListsWrapper} />
          </div>
        </div>
      </Router>
    );
  }

  @bind
  private loginHandle() {
    this.props.authorize(true);
  }

  @bind
  private dialogToggle() {
    this.setState({ tasksListDialogShow: !this.state.tasksListDialogShow });
  }

  @bind
  private mapTasks() {
    return this.props.taskLists.map((taskList: ITaskList) =>
      (
        <Link key={taskList.id} to={taskList.id} className={b('menu-section')()}>
          <InlineSvg src={listIcon} className={b('icon')()} element="div" />
          <ListItem
            caption={taskList.title}
            className={b('list-title')()}
          />
        </Link>
      ),
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
    return {
      isLoggedIn: state.isLoggedIn,
      taskLists: state.taskLists,
      tasks: state.tasks,
    };
};

const mapDispatchToProps = {
  loadTaskLists,
  loadTasks,
  updateTaskStatus,
  createTask,
  createTaskList,
  authorize,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default connectedApp;
