import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator } from 'redux';
import { Reducer } from 'redux';
import { ITasksList } from 'modules/redux/namespace';

export interface IAction {
  type: string;
  payload?: { [key: string]: any } | number | string;
}

export interface IReduxState {
  isLoggedIn: boolean;
  tasksLists: ITasksList[];
}
