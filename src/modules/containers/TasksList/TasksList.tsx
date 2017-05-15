import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import LoginButton from '../../components/LoginButton/LoginButton';
import { Button } from 'react-toolbox/lib/button/';
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  ListCheckbox,
} from 'react-toolbox/lib/list';
import { connect } from 'react-redux';
import { IReduxState } from 'shared/types/app';
import { loadTasks } from '../../redux/actions/TaskListsActions';
import { Redirect } from 'react-router-dom';
import './TasksList.styl';

const b = block('tasks-list');

interface ITasksListProps {
  tasksLists: any;
  loadTasks(): void;
}

interface ITasksListState {
  drawerActive: boolean;
}

class TasksList extends React.PureComponent<ITasksListProps, ITasksListState> {
  constructor(props: ITasksListProps) {
    super(props);
    this.state = {
      drawerActive: true,
    };
  }

  public componentDidMount() {
    this.props.loadTasks();
  }

  public render() {
    return(
      <div className={b()}>
        <List
          selectable
          ripple
        >
          <ListItem
            caption="About"
            className={b('list-name')()}
            onClick={this.aboutRedirection}
          />
          <ListSubHeader caption="Your Google Tasks" />
          {this.mapTasks()}
          <ListDivider />
          <ListItem
            caption="Log Out"
            className={b('list-name')()}
          />
        </List>
      </div>
    );
  }

  @bind
  private aboutRedirection() {
    return (
      <Redirect to="/about" />
    );
  }

  @bind
  private drawerToggle() {
    this.setState({
      drawerActive: !this.state.drawerActive,
    });
  }

  @bind
  private mapTasks() {
    return this.props.tasksLists.map((taskList: any) =>
      (
        <ListItem
          key={taskList.id}
          caption={taskList.title}
          className={b('list-name')()}
        />
      ),
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
    return {
        tasksLists: state.tasksLists,
    };
};

const mapDispatchToProps = {
    loadTasks,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TasksList);

export default connectedApp;
