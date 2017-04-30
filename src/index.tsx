import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import './assets/common.styl';
import LoginPage from './modules/containers/LoginPage/LoginPage';
import Api from 'shared/api/google-tasks-api';
import {  IReducerData } from './shared/types/app';

// const store = createStore();

ReactDOM.render(
  <Provider>
    <LoginPage />
  </Provider>,
  document.getElementById('root'),
);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  Api.handleClientLoad();
}
