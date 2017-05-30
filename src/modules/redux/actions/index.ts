import * as SessionsActions from './SessionActions';
import * as TasksActions from './TasksActions';
import * as TaskListsActions from './TaskListsActions';

export const actions = {
  ...SessionsActions,
  ...TaskListsActions,
  ...TasksActions,
};
