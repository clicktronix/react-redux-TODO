import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { Button } from 'react-toolbox/lib/button/';
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
import { loadTasks } from '../../redux/actions/TaskListsActions';
import { authorize } from 'modules/redux/actions/SessionActions';
import { Redirect, Link } from 'react-router-dom';
import About from 'modules/containers/About/About';
import Tasks from 'modules/containers/Tasks/Tasks';
import './App.styl';
import { ITasksList } from 'modules/redux/namespace';

const b = block('app');

interface ITasksListProps {
  isLoggedIn: boolean;
  tasksLists: ITasksList[];
  loadTasks(): void;
  authorize(immediate: boolean): void;
}

class App extends React.PureComponent<ITasksListProps, {}> {
  public componentWillReceiveProps(nextProps: ITasksListProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.loadTasks();
    }
  }

  public render() {
    return(
      <Router>
        <div className={b()}>
          <List selectable ripple >
            <Link to="/about">
              <ListItem
                caption="About"
                className={b('menu-sections')()}
              />
            </Link>
            <ListSubHeader
              caption={this.props.isLoggedIn ? 'Your Google Tasks' : 'Log In with Google'}
            />
            {this.mapTasks()}
            <ListDivider />
            <ListItem
              caption={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
              className={b('menu-sections')()}
              onClick={this.loginHandle}
            />
          </List>
          <div className={b('tasks-section')()}>
            <Route path="/about" component={About as any} />
            <Route path="/tasks" component={Tasks as any} />
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
  private mapTasks() {
    return this.props.tasksLists.map((taskList: any) =>
      (
        <ListItem
          key={taskList.id}
          caption={taskList.title}
          className={b('menu-sections')()}
        />
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
  loadTasks,
  authorize,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default connectedApp;
