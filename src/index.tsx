import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import GoogleTasksApi from 'services/api/GoogleTasksApi';
import { composeReducers } from 'shared/helpers/redux';
import { IDependencies, IAppReduxState } from 'shared/types/app';
import { saga as authSaga, reducer as auth } from 'features/auth';
import { saga as taskSaga, reducer as task } from 'features/task';
import { saga as taskListSaga, reducer as taskList } from 'features/taskList';
import { TaskManager, saga as taskManagerSaga, reducer as taskManager } from 'modules/TaskManager';
import { reducer as multiConnectMainReducer } from 'shared/helpers/redux/multiConnect';
import './shared/view/styles/common.styl';

const api: GoogleTasksApi = new GoogleTasksApi();
const deps: IDependencies = { api };
const rootReducer = combineReducers<IAppReduxState>({
  auth,
  taskManager,
  task,
  taskList,
});
const reducer = composeReducers<IAppReduxState>([rootReducer, multiConnectMainReducer]);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(taskManagerSaga, deps);
sagaMiddleware.run(authSaga, deps);
sagaMiddleware.run(taskSaga, deps);
sagaMiddleware.run(taskListSaga, deps);

ReactDOM.render(
  <Provider store={store}>
    <TaskManager {...store.getState()} />
  </Provider>,
  document.getElementById('root'),
);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  api.handleClientLoad();
}
