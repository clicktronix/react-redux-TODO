import { IAppReduxState } from 'shared/types/app';
import { IReduxState } from '../namespace';
import { ITask } from 'shared/types/model';

export function selectState(state: IAppReduxState): IReduxState {
  return state.task;
}

export function selectAuthState(state: IAppReduxState): ITask {
  return selectState(state).data;
}
