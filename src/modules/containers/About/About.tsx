import * as block from 'bem-cn';
import * as React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import './About.styl';
import { connect } from 'react-redux';
import { authorize } from 'modules/redux/actions/SessionActions';
import { IReduxState } from 'shared/types/app';

const b = block('about');

export default class About extends React.PureComponent<{}, {}> {
  public render() {
    return(
      <div className={b()}>
        <h1>This is a test application for studing React Redux stack technology</h1>
      </div>
    );
  }
}
