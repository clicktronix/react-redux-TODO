import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator, Reducer } from 'redux';
import GoogleTasksApi from 'services/api/GoogleTasksApi';
import { IReduxState as ISessionState } from 'features/auth/namespace';
import { IReduxState as ITaskState } from 'features/task/namespace';
import { IReduxState as ITaskListState } from 'features/taskList/namespace';
import { IReduxState as ITaskManager } from 'modules/TaskManager/namespace';
import { IMultiInstanceState } from 'shared/helpers/redux/multiConnect/namespace';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IDependencies {
  api: GoogleTasksApi;
}

export interface IAppReduxState {
  auth: ISessionState;
  taskList: ITaskListState;
  taskManager: ITaskManager;
  task: ITaskState;
}
