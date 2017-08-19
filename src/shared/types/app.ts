import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ActionCreator, Reducer } from 'redux';
import { ITaskList, ITask } from 'modules/redux/namespace';

export interface IAction {
  type: Action;
  payload?: any;
}

export type IThunkAction<S, E, R> = (dispatch: IDispatch, getState: () => S, extraArgument?: E) => R;

export interface IReduxState {
  auth: ISessionState;
  taskLists: ITaskListState;
  tasks: ITaskState;
}

export interface ISessionState {
  isLoggedIn: boolean;
}

export interface ITaskListState {
  taskLists: ITaskList[];
}

export interface ITaskState {
  tasks: ITask[];
}

export interface IDispatch {
  <S, E, R>(asyncAction: IThunkAction<S, E, R>): R;
  (action: IAction): IAction;
}

type Action =
  'SESSION_AUTHORIZE' |
  'SESSION_AUTHORIZE_SUCCESS' |
  'SESSION_AUTHORIZE_FAIL' |
  'SESSION_SIGNOUT' |
  'TASK_LIST_LOAD' |
  'TASK_LIST_LOAD_SUCCESS' |
  'TASK_LIST_LOAD_FAIL' |
  'TASK_LIST_CREATE' |
  'TASK_LIST_CREATE_SUCCESS' |
  'TASK_LIST_CREATE_FAIL' |
  'TASK_LIST_UPDATE' |
  'TASK_LIST_UPDATE_SUCCESS' |
  'TASK_LIST_UPDATE_FAIL' |
  'TASK_LIST_DELETE' |
  'TASK_LIST_DELETE_SUCCESS' |
  'TASK_LIST_DELETE_FAIL' |
  'TASKS_LOAD' |
  'TASKS_LOAD_SUCCESS' |
  'TASKS_LOAD_FAIL' |
  'TASK_UPDATE' |
  'TASK_UPDATE_SUCCESS' |
  'TASK_UPDATE_FAIL' |
  'TASK_UPDATE_STATUS' |
  'TASK_UPDATE_STATUS_SUCCESS' |
  'TASK_UPDATE_STATUS_FAIL' |
  'TASK_CREATE' |
  'TASK_CREATE_SUCCESS' |
  'TASK_CREATE_FAIL' |
  'TASK_DELETE' |
  'TASK_DELETE_SUCCESS' |
  'TASK_DELETE_FAIL';
