import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator } from 'redux';
import { Reducer } from 'redux';
import { ITaskList, ITask } from 'modules/redux/namespace';

export interface IAction {
  type: string;
  payload?: any;
}

export type IThunkAction<S, E, R> = (dispatch: IDispatch, getState: () => S, extraArgument?: E) => R;

export interface IReduxState {
  auth: ISessionReducer;
  taskLists: ITaskListReducer;
  tasks: ITaskReducer;
}

export interface ISessionReducer {
  isLoggedIn: boolean;
}

export interface ITaskListReducer {
  taskLists: ITaskList[];
}

export interface ITaskReducer {
  tasks: ITask[];
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  (action: IAction): IAction;
}
