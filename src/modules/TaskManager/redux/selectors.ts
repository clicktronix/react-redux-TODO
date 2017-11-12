import { IAppReduxState } from 'shared/types/app';
import { IReduxState } from '../namespace';
import { ITaskList, ITask } from 'shared/types/model';

export function selectState(state: IAppReduxState): IReduxState {
  return state.taskManager;
}

export function selectTasks(state: IAppReduxState): ITask[] {
  return state.taskList.data.tasks;
}

export function selectTaskLists(state: IAppReduxState): ITaskList[] {
  return state.taskManager.data.taskLists;
}

export function selectAuthState(state: IAppReduxState): boolean {
  return state.auth.data.isLoggedIn;
}
