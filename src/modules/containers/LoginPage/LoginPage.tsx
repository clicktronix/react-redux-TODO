import * as block from 'bem-cn';
import * as React from 'react';
import * as Api from 'shared/api/google-tasks';
import LoginButton from '../../components/LoginButton/LoginButton';
import './LoginPage.styl';

const b = block('login-page');

class LoginPage extends React.PureComponent<{}, {}> {
  public render() {
    return(
      <div className={b()}>
        <LoginButton />
      </div>
    );
  }

}

export default LoginPage;
