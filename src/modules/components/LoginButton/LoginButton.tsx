import * as block from 'bem-cn';
import { bind } from 'decko';
import * as React from 'react';
import { Button } from 'react-toolbox/lib/button/';
import './LoginButton.styl';

const b = block('button');

interface ILoginButton {
  isLoggedIn: boolean;
  authorize(immediate: boolean): void;
}

class LoginButton extends React.PureComponent<ILoginButton, {}> {

  public render() {
    return (
      <div>
        <h1>Login with Google</h1>
        <Button
          neutral={false}
          label= "Login"
          onClick={this.clickHandle}
          className={b()}
        />
      </div>
    );
  }

  @bind
  private clickHandle() {
    this.props.authorize(true);
  }
}

export default LoginButton;
