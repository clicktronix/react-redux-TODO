import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IAppReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import { ITask, IGoogleTasksResponse } from 'shared/types/model';
import {
  createTaskSuccess,
  createTaskFail,
  loadTasksSuccess,
  loadTasksFail,
} from '../actions';

const createTaskPattern: NS.ICreateTask['type'] = 'TASK_LIST:CREATE_TASK';
const loadTasksPattern: NS.ILoadTasks['type'] = 'TASK_LIST:LOAD_TASKS';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(createTaskPattern, createTask, deps);
  yield takeEvery(loadTasksPattern, loadTasks, deps);
}

function* createTask(deps: IDependencies, action: NS.ICreateTask) {
  try {
    const data: ITask = yield call(deps.api.insertTask, {
      taskListId: action.payload.taskListId,
      title: action.payload.text,
    });
    yield put(createTaskSuccess(data));
  } catch (error) {
    yield put(createTaskFail(error));
  }
}

function* loadTasks(deps: IDependencies, action: NS.ILoadTasks) {
  try {
    const data: IGoogleTasksResponse = yield call(deps.api.getTasksList, action.payload);
    yield put(loadTasksSuccess(data.items));
  } catch (error) {
    yield put(loadTasksFail(error));
  }
}
