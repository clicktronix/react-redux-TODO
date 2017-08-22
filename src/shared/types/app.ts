import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator, Reducer } from 'redux';
import Api from 'services/api/google-tasks-api';
import { IReduxState as ISessionState } from 'features/auth/namespace';
import { IReduxState as ITaskState } from 'features/crudTask/namespace';
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
  app: IApp;
  task: IMultiInstanceState<ITaskState>;
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  (action: IAction): IAction;
}
