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
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { IReduxState } from 'shared/types/app';
import { actions as authActions } from 'features/auth';
import { actions as crudTaskActions } from 'features/crudTask';
import { actions as taskListActions } from 'modules/App/';
import About from 'modules/App/view/components/About/About';
import TaskList from 'modules/App/view/components/TaskList/TaskList';
import Auth from 'features/auth/view/Auth';
import CreateItemDialog from 'shared/view/components/CreateItemDialog/CreateItemDialog';
import MenuElement from 'modules/App/view/components/MenuElement/MenuElement';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { ITaskList, ITask } from 'services/api/types/';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { match } from 'react-router';
import { infoIcon, addIcon, moreVertIcon } from 'shared/view/img';
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
  signIn(immediate: boolean): void;
  signOut(): void;
}

interface IAppState {
  tasksListDialogShow: boolean;
  currentListId: string;
}

class App extends React.PureComponent<IAppProps, {}> {
  public state: IAppState = {
    tasksListDialogShow: false,
    currentListId: '',
  };

  public componentWillReceiveProps({ isLoggedIn }: IAppProps): void {
    if (this.props.isLoggedIn !== isLoggedIn) {
      this.props.loadTaskLists();
    }
  }

  public render(): JSX.Element {
    // tslint:disable-next-line:no-shadowed-variable
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
            {
              this.props.isLoggedIn ?
              (
                <div>
                  {this.mapTaskLists()}
                  <Link to="" className={b('menu-section')()}>
                    <ListItem
                      leftIcon={<InlineSvg src={addIcon} className={b('icon')()} element="div" />}
                      caption="Create new list"
                      className={b('list-title')()}
                      onClick={this.dialogToggle}
                    >
                      <CreateItemDialog
                        tasksListDialogShow={this.state.tasksListDialogShow}
                        dialogToggle={this.dialogToggle}
                        createTaskList={this.props.createTaskList}
                      />
                    </ListItem>
                  </Link>
                </div>
              ) : null
            }
            <ListDivider />
            <Auth
              isLoggedIn={this.props.isLoggedIn}
              signIn={this.props.signIn}
              signOut={this.props.signOut}
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
  private dialogToggle(): void {
    this.setState({ tasksListDialogShow: !this.state.tasksListDialogShow });
  }

  @bind
  private mapTaskLists(): JSX.Element[] {
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
      isLoggedIn: state.auth.data.isLoggedIn,
      taskLists: state.taskLists.data.taskLists,
      tasks: state.tasks.data.tasks,
    };
};

const mapDispatchToProps = {
  ...authActions,
  ...crudTaskActions,
  ...taskListActions,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default connectedApp;
