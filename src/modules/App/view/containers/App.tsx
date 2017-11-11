import * as block from 'bem-cn';
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InlineSvg from 'svg-inline-react';
import { match, Switch } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { bind } from 'decko';

import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
} from 'react-toolbox/lib/list';
import { IAppReduxState } from 'shared/types/app';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import { TaskList } from 'features/taskList';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { ITaskList, ITask } from 'shared/types/model';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { infoIcon, addIcon, moreVertIcon } from 'shared/view/img';
import About from '../components/About/About';
import CreateTaskList from '../components/CreateTaskList/CreateTaskList';
import MenuElement from '../components/MenuElement/MenuElement';
import { Auth } from 'features/auth';
import './App.styl';

const b = block('app');

interface IStateProps {
  isLoggedIn: boolean;
  taskLists: ITaskList[];
  tasks: ITask[];
}

interface IDispatchProps {
  createTaskList({ title }: { title: string }): void;
  deleteTaskList(taskListId: string): void;
  updateTaskList({ taskListId, title }: { taskListId: string; title: string; }): void;
  loadTaskLists(): void;
}

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    isLoggedIn: selectors.selectAuthState(state),
    taskLists: selectors.selectTaskLists(state),
    tasks: selectors.selectTasks(state),
  };
}

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    createTaskList: actions.createTaskList,
    deleteTaskList: actions.deleteTaskList,
    updateTaskList: actions.updateTaskList,
    loadTaskLists: actions.loadTaskLists,
  }, dispatch);
}

interface IState {
  tasksListDialogShow: boolean;
  currentListId: string;
}

type IProps = IStateProps & IDispatchProps;

class App extends React.PureComponent<IProps, IState> {
  public state: IState = {
    tasksListDialogShow: false,
    currentListId: '',
  };

  public componentWillReceiveProps({ isLoggedIn }: IStateProps): void {
    if (this.props.isLoggedIn !== isLoggedIn) {
      this.props.loadTaskLists();
    }
  }

  public render(): JSX.Element {
    // tslint:disable-next-line:no-shadowed-variable
    const ListsWrapper = ({ match }: { match: match<{ id: string; }>}) => {
      const listIndex = this.props.taskLists.findIndex((item) => item.id === match.params.id);
      return (
        <TaskList
          taskList={this.props.taskLists[listIndex]}
          id={match.params.id}
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
                      <CreateTaskList
                        tasksListDialogShow={this.state.tasksListDialogShow}
                        dialogToggle={this.dialogToggle}
                        createTaskList={this.props.createTaskList}
                        onSuccess={this.props.loadTaskLists}
                      />
                    </ListItem>
                  </Link>
                </div>
              ) : null
            }
            <ListDivider />
            <Auth />
          </List>
          <div className={b('tasks-section')()}>
            <Switch>
              <Route path="/about" component={About as any} />
              <Route path="/:id" render={ListsWrapper} />
            </Switch>
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

const connectedApp = connect<IStateProps, IDispatchProps, {}>(
  mapStateToProps,
  mapDispatch,
)(App);

export default connectedApp;
