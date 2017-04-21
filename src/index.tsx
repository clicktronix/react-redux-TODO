import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import App from './modules/containers/App';
import {  IReducerData } from './shared/types/app';

// const store = createStore();

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
