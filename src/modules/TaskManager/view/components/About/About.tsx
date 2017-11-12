import * as block from 'bem-cn';
import * as React from 'react';
import './About.styl';

const b = block('about');

export default class About extends React.PureComponent<{}> {
  public render(): JSX.Element {
    return(
      <div className={b()}>
        <h1>This is a test application for studing React Redux stack technology</h1>
      </div>
    );
  }
}
