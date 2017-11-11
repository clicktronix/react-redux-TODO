import { IAppReduxState } from 'shared/types/app';
import { IReduxState } from '../namespace';
import { ITaskList, ITask } from 'shared/types/model';

export function selectState(state: IAppReduxState): IReduxState {
  return state.taskList;
}

export function selectTasks(state: IAppReduxState): ITask[] {
  return selectState(state).data.tasks;
}
