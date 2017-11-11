import * as block from 'bem-cn';
import * as React from 'react';
import { bind } from 'decko';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import { IAppReduxState } from 'shared/types/app';
import {
  ListItem,
} from 'react-toolbox/lib/list';
import './Auth.styl';

const b = block('auth');

export interface IStateProps {
  isLoggedIn: boolean;
}

export interface IDispatchProps {
  signIn(immediate: boolean): void;
  signOut(): void;
}

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    isLoggedIn: selectors.selectAuthState(state),
  };
}

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    signIn: actions.signIn,
    signOut: actions.signOut,
  }, dispatch);
}

type IProps = IStateProps & IDispatchProps;

class Auth extends React.PureComponent<IProps> {
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
    this.props.signIn(true);
  }

  @bind
  private signOutHandle(): void {
    this.props.signOut();
  }
}

const connectedAuth = connect<IStateProps, IDispatchProps, {}>(
  mapStateToProps,
  mapDispatch,
)(Auth);

export default connectedAuth;
export { Auth };
