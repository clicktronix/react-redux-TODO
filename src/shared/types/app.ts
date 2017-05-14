import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator } from 'redux';
import { Reducer } from 'redux';

export interface IAction {
  type: string;
  payload?: { [key: string]: any } | number | string;
}

export interface IReduxState {
  isLoggedIn: boolean;
  tasksLists: any;
}
