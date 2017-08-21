import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import {
  ListItem,
} from 'react-toolbox/lib/list';
import './Auth.styl';

const b = block('auth');

export interface IAuth {
  isLoggedIn: boolean;
  signInHandle(immediate: boolean): void;
  signOutHandle(): void;
}

export default class Auth extends React.PureComponent<IAuth, {}> {
  public render(): JSX.Element {
    return(
      <ListItem
        caption={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
        className={b('element')()}
        onClick={this.props.isLoggedIn ? this.signOutHandle : this.signInHandle}
      />
    );
  }

  @bind
  private signInHandle(): void {
    this.props.signInHandle(true);
  }

  @bind
  private signOutHandle(): void {
    this.props.signOutHandle();
  }
}
