import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import './assets/common.styl';
import LoginPage from './modules/containers/LoginPage/LoginPage';
import About from './modules/containers/About/About';
import TasksList from './modules/containers/TasksList/TasksList';
import Api from 'shared/api/google-tasks-api';
import { rootReducer } from './modules/redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={LoginPage as any} />
        <Route path="/about" component={About as any} />
        <Route path="/tasks-list" component={TasksList as any} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const api = new Api();
  api.handleClientLoad();
}
