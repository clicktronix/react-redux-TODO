import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  ListCheckbox,
} from 'react-toolbox/lib/list';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { IReduxState } from 'shared/types/app';
import { loadTasksLists, createTasksList } from '../../redux/actions/TaskListsActions';
import { authorize } from 'modules/redux/actions/SessionActions';
import { Link } from 'react-router-dom';
import About from 'modules/containers/About/About';
import Tasks from 'modules/containers/Tasks/Tasks';
import CreateTaskList from '../../components/CreateTaskList/CreateTaskList';
import { ITaskList } from 'modules/redux/namespace';
import './App.styl';

const b = block('app');

interface IAppProps {
  isLoggedIn: boolean;
  tasksLists: ITaskList[];
  loadTasksLists(): void;
  createTasksList( { title }: { title: string }): void;
  authorize(immediate: boolean): void;
}

interface IAppState {
  tasksListDialogShow: boolean;
}

class App extends React.PureComponent<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      tasksListDialogShow: false,
    };
  }

  public componentWillReceiveProps(nextProps: IAppProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.loadTasksLists();
    }
  }

  public render() {
    return(
      <Router>
        <div className={b()}>
          <List selectable ripple >
            <h2 className={b('tasks-header-title')()}>Tasks navigation</h2>
            <ListDivider />
            <Link to="/about">
              <ListItem caption="About" className={b('menu-sections')()} />
            </Link>
            <ListSubHeader
              caption={this.props.isLoggedIn ? 'Your Google Tasks' : 'Log In with Google'}
            />
            {this.mapTasks()}
            {
              this.props.isLoggedIn ?
              (
                <ListItem
                  caption="Create new list"
                  className={b('menu-sections')()}
                  onClick={this.dialogToggle}
                >
                  <CreateTaskList
                    dialogToggle={this.dialogToggle}
                    tasksListDialogShow={this.state.tasksListDialogShow}
                    createTasksList={this.props.createTasksList}
                  />
                </ListItem>
              ) : null
            }
            <ListDivider />
            <ListItem
              caption={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
              className={b('menu-sections')()}
              onClick={this.loginHandle}
            />
          </List>
          <div className={b('tasks-section')()}>
            <Route path="/about" component={About as any} />
            <Route path="/:id" component={Tasks as any} />
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
    return this.props.tasksLists.map((taskList: ITaskList) =>
      (
        <Link key={taskList.id} to={taskList.id}>
          <ListItem
            caption={taskList.title}
            className={b('menu-sections')()}
          />
        </Link>
      ),
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
    return {
      isLoggedIn: state.isLoggedIn,
      tasksLists: state.tasksLists,
    };
};

const mapDispatchToProps = {
  loadTasksLists,
  createTasksList,
  authorize,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default connectedApp;
