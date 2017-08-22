import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  loadTaskListsSuccess,
  loadTaskListsFail,
  updateTaskListSuccess,
  updateTaskListFail,
  createTaskListSuccess,
  createTaskListFail,
  deleteTaskListSuccess,
  deleteTaskListFail,
} from '../actions';
import { ITaskList, IGoogleTaskListsResponse } from 'services/api/types';

const loadTaskListPattern: NS.ILoadTaskList['type'] = 'TASK_LIST:LOAD';
const updateTaskListPattern: NS.IUpdateTaskList['type'] = 'TASK_LIST:UPDATE';
const createTaskListPattern: NS.ICreateTaskList['type'] = 'TASK_LIST:CREATE';
const deleteTaskListPattern: NS.IDeleteTaskList['type'] = 'TASK_LIST:DELETE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadTaskListPattern, loadTaskList, deps);
  yield takeEvery(updateTaskListPattern, updateTaskList, deps);
  yield takeEvery(createTaskListPattern, createTaskList, deps);
  yield takeEvery(deleteTaskListPattern, deleteTaskList, deps);
}

function* loadTaskList(deps: IDependencies, action: NS.IUpdateTaskList) {
  try {
    const data: IGoogleTaskListsResponse = yield call(deps.api.getTaskLists);
    yield put(loadTaskListsSuccess(data.items));
  } catch (error) {
    yield put(loadTaskListsFail(error));
  }
}

function* updateTaskList(deps: IDependencies, action: NS.IUpdateTaskList) {
  try {
    const id = action.payload.taskListId;
    const data: ITaskList = yield call(deps.api.updateTaskList, {
      taskListId: action.payload.taskListId,
      title: action.payload.title,
    });
    yield put(updateTaskListSuccess({ id, data }));
  } catch (error) {
    yield put(updateTaskListFail(error));
  }
}

function* createTaskList(deps: IDependencies, action: NS.ICreateTaskList) {
  try {
    const title = action.payload.title;
    const data: ITaskList = yield call(deps.api.insertTaskList, {
      title,
    });
    yield put(createTaskListSuccess(data));
  } catch (error) {
    yield put(createTaskListFail(error));
  }
}

function* deleteTaskList(deps: IDependencies, action: NS.IDeleteTaskList) {
  try {
    const id = action.payload;
    const data: ITaskList = yield call(deps.api.deleteTaskList, action.payload);
    yield put(deleteTaskListSuccess({ id, data }));
  } catch (error) {
    yield put(deleteTaskListFail(error));
  }
}
