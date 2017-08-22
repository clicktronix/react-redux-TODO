import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Api from 'services/api/google-tasks-api';
import { IDependencies, IReduxState } from 'shared/types/app';
import { saga as authSaga, reducer as auth } from 'features/auth';
import { saga as taskSaga, reducer as tasks } from 'features/crudTask';
import { App, saga as taskListSaga, reducer as taskLists } from 'modules/App';
import './shared/view/common.styl';

const api: Api = new Api();
const deps: IDependencies = { api };
const reducer = combineReducers<IReduxState>({
  auth,
  tasks,
  taskLists,
});
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(authSaga, deps);
sagaMiddleware.run(taskSaga, deps);
sagaMiddleware.run(taskListSaga, deps);

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
