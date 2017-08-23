import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  loadTaskListsSuccess,
  loadTaskListsFail,
  loadTasksSuccess,
  loadTasksFail,
} from '../actions';
import { ITaskList, IGoogleTaskListsResponse, IGoogleTasksResponse } from 'services/api/types';

const loadTaskListPattern: NS.ILoadTaskList['type'] = 'TASK_LIST:LOAD';
const loadTasksPattern: NS.ILoadTasks['type'] = 'CRUD_TASK:LOAD';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadTasksPattern, loadTasks, deps);
  yield takeEvery(loadTaskListPattern, loadTaskLists, deps);
}

function* loadTaskLists(deps: IDependencies, action: NS.ILoadTaskList) {
  try {
    const data: IGoogleTaskListsResponse = yield call(deps.api.getTaskLists);
    yield put(loadTaskListsSuccess(data.items));
  } catch (error) {
    yield put(loadTaskListsFail(error));
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
