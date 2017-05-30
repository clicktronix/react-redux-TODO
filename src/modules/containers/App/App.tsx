import * as block from 'bem-cn';
import * as React from 'react';
import * as InlineSvg from 'svg-inline-react';
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
import * as ActionCreators from 'modules/redux/actions';
import { Link } from 'react-router-dom';
import About from 'modules/containers/About/About';
import TaskList from 'modules/containers/TaskList/TaskList';
import CreateTaskList from '../../components/CreateTaskList/CreateTaskList';
import MenuElement from '../../components/MenuElement/MenuElement';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { ITaskList, ITask } from 'modules/redux/namespace';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { match } from 'react-router';
import { infoIcon, addIcon, moreVertIcon } from 'assets/img';
import './App.styl';

const b = block('app');

interface IAppProps {
  isLoggedIn: boolean;
  taskLists: ITaskList[];
  tasks: ITask[];
  loadTaskLists(): void;
  createTaskList({ title }: { title: string }): void;
  deleteTaskList(taskListId: string): void;
  updateTaskList({ taskListId, title }: { taskListId: string; title: string; }): void;
  loadTasks(taskListId: string): void;
  updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }): void;
  updateTask(params: { taskListId: string; taskId: string; text: string; }): void;
  createTask(params: { taskListId: string; text: string; }): void;
  deleteTask(params: { taskListId: string; taskId: string; }): void;
  authorize(immediate: boolean): void;
}

class App extends React.PureComponent<IAppProps, {}> {
  public state = {
    tasksListDialogShow: false,
    currentListId: '',
  };

  public componentWillReceiveProps(nextProps: IAppProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.loadTaskLists();
    }
  }

  public render() {
    const ListsWrapper = ({ match }: { match: match<{ id: string; }>}) => {
      return (
        <TaskList
          taskLists={this.props.taskLists}
          id={match.params.id}
          loadTasks={this.props.loadTasks}
          tasks={this.props.tasks}
          updateTaskStatus={this.props.updateTaskStatus}
          createTask={this.props.createTask}
          updateTask={this.props.updateTask}
          deleteTask={this.props.deleteTask}
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
              <ListItem
                caption="About"
                className={b('list-title')()}
                leftIcon={<InlineSvg src={infoIcon} className={b('icon')()} element="div" />}
              />
            </Link>
            <ListSubHeader caption={this.props.isLoggedIn ? 'Your Google Tasks' : 'Log In with Google'} />
            {this.mapTaskLists()}
            {
              this.props.isLoggedIn ?
              (
                <Link to="" className={b('menu-section')()}>
                  <ListItem
                    leftIcon={<InlineSvg src={addIcon} className={b('icon')()} element="div" />}
                    caption="Create new list"
                    className={b('list-title')()}
                    onClick={this.dialogToggle}
                  >
                    <CreateTaskList
                      dialogToggle={this.dialogToggle}
                      tasksListDialogShow={this.state.tasksListDialogShow}
                      createTaskList={this.props.createTaskList}
                    />
                  </ListItem>
                </Link>
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
  private mapTaskLists() {
    return this.props.taskLists.map((taskList: ITaskList) =>
      (
        <MenuElement
          key={taskList.id}
          taskList={taskList}
          deleteTaskList={this.props.deleteTaskList}
          updateTaskList={this.props.updateTaskList}
        />
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
  ...ActionCreators.actions,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default connectedApp;
