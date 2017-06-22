import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Api from 'shared/api/google-tasks-api';
import { rootReducer } from './modules/redux/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from 'modules/containers/App/App';
import './assets/common.styl';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <App {...store.getState()} />
  </Provider>,
  document.getElementById('root'),
);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const api = new Api();
  api.handleClientLoad();
}
