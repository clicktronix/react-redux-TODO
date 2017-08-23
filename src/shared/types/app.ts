import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator, Reducer } from 'redux';
import Api from 'services/api/google-tasks-api';
import { IReduxState as ISessionState } from 'features/auth/namespace';
import { IReduxState as ITaskState } from 'features/crudTask/namespace';
import { IReduxState as ITaskListState } from 'features/crudTaskList/namespace';
import { IReduxState as IAddTaskState } from 'features/addTask/namespace';
import { IReduxState as IAddTaskListState } from 'features/addTaskList/namespace';
import { IReduxState as IApp } from 'modules/App/namespace';
import { IMultiInstanceState } from 'shared/helpers/redux/multiConnect/namespace';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IDependencies {
  api: Api;
}

export type IThunkAction<S, E, R> = (dispatch: IDispatch, getState: () => S, extraArgument?: E) => R;

export interface IReduxState {
  auth: ISessionState;
  addTask: IAddTaskState;
  addTaskList: IAddTaskListState;
  app: IApp;
  tasks: IMultiInstanceState<ITaskState>;
  taskLists: IMultiInstanceState<ITaskListState>;
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  (action: IAction): IAction;
}
