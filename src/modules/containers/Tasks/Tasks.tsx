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
import { connect } from 'react-redux';
import { IReduxState } from 'shared/types/app';
import { loadTasks } from '../../redux/actions/TaskListsActions';
import { Redirect } from 'react-router-dom';

const b = block('tasks');

export default class Tasks extends React.PureComponent<{}, {}> {
  public render() {
    return(
      <div className={b()}>
        <h1>HALLO</h1>
      </div>
    );
  }
}
