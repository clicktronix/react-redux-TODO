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
  isLoggedIn: boolean;
  taskLists: ITaskList[];
  tasks: ITask[];
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  (action: IAction): IAction;
}
