import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import LoginButton from '../../components/LoginButton/LoginButton';
import { Button } from 'react-toolbox/lib/button/';
import {
  Redirect,
} from 'react-router-dom';
import './TasksList.styl';

const b = block('tasks-list');

interface ITasksList {
  redirect: boolean;
}

class TasksList extends React.PureComponent<{}, ITasksList> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  @bind
  public redirectHandle() {
    this.setState({
      redirect: true,
    });
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
          label= "Logout"
          className={b()}
        />
      </div>
    );
  }
}

export default TasksList;
