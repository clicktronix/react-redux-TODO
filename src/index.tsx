import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Api from 'services/api/google-tasks-api';
import { IDependencies } from 'shared/types/app';
import { rootReducer } from './modules/redux/reducers';
import { saga as taskSaga } from 'features/crudTask';
import App from 'modules/App/App';
import './shared/view/common.styl';

const api: Api = new Api();
const deps: IDependencies = { api };
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(taskSaga, deps);

ReactDOM.render(
  <Provider store={store}>
    <App {...store.getState()} />
  </Provider>,
  document.getElementById('root'),
);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  api.handleClientLoad();
}
