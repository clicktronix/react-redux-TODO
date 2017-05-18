import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator } from 'redux';
import { Reducer } from 'redux';
import { ITaskList } from 'modules/redux/namespace';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IPromisedAction<S, E, R> {
  types: [string, string, string];
  promise: (client: E, getState: () => S) => Promise<R>;
  postResolve?: (payload: any, dispatch: IDispatch, getState: () => S) => void;
}

export type IThunkAction<S, E, R> = (dispatch: IDispatch, getState: () => S, extraArgument?: E) => R;

export interface IReduxState {
  isLoggedIn: boolean;
  tasksLists: ITaskList[];
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  <S, E, R>(action: IPromisedAction<S, E, R>): Promise<R>;
  (action: IAction): IAction;
}
