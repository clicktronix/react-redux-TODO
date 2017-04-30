import * as block from 'bem-cn';
import { bind } from 'decko';
import * as React from 'react';
import { Button } from 'react-toolbox/lib/button/';
import Api from 'shared/api/google-tasks';
import './LoginButton.styl';

const b = block('button');

class LoginButton extends React.PureComponent<{}, {}> {
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
    Api.authorize({ immediate: false });
  }
}

export default LoginButton;
