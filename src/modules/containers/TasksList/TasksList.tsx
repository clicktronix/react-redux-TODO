import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import LoginButton from '../../components/LoginButton/LoginButton';
import { Button } from 'react-toolbox/lib/button/';
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
  redirect: boolean;
}

class TasksList extends React.PureComponent<ITasksListProps, ITasksListState> {
  constructor(props: ITasksListProps) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  public render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/about" />
      );
    }

    return(
      <div className={b()}>
        <h1>HELLO EPTA</h1>
        <Button
          neutral={false}
          label= "About"
          onClick={this.redirectHandle}
          className={b()}
        />
        <Button
          neutral={false}
          label= "Get tasks"
          onClick={this.tasksListsLoader}
          className={b()}
        />
        {this.mapTasks()}
      </div>
    );
  }

  @bind
  private mapTasks() {
    const tasksList = this.props.tasksLists.map((taskList: any) =>
      <li key={taskList.id}>{taskList.title}</li>,
    );
    return (
      <ul>{tasksList}</ul>
    );
  }

  @bind
  private redirectHandle() {
    this.setState({
      redirect: true,
    });
  }

  @bind
  private tasksListsLoader() {
    this.props.loadTasks();
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
