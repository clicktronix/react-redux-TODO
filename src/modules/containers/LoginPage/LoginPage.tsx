import * as block from 'bem-cn';
import * as React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import './LoginPage.styl';
import { connect } from 'react-redux';
import { authorize } from 'modules/redux/actions/SessionActions';
import { IReduxState } from 'shared/types/app';
import About from '../About/About';
import TasksList from '../TasksList/TasksList';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

const b = block('login-page');

interface ILoginPage {
  isLoggedIn: boolean;
  authorize(immediate: boolean): void;
}

class LoginPage extends React.PureComponent<ILoginPage, {}> {
  public render() {
    if (this.props.isLoggedIn) {
      return (
        <Redirect to="/tasks-list" />
      );
    }

    return(
      <Router>
        <div className={b()}>
          <LoginButton
            authorize={this.props.authorize}
            isLoggedIn={this.props.isLoggedIn}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
    return {
        isLoggedIn: state.isLoggedIn,
    };
};

const mapDispatchToProps = {
    authorize,
};

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);

export default connectedApp;
