import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator } from 'redux';
import { Reducer } from 'redux';

export interface IReducerData<S> {
  name: string;
  reducer: Reducer<S>;
}

export interface IAction {
  type: string;
  payload?: { [key: string]: any } | number | string | null;
}

// interface IReduxState {
// }
