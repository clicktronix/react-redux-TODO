import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IAppReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  loadTaskListsSuccess,
  loadTaskListsFail,
  updateTaskListSuccess,
  updateTaskListFail,
  deleteTaskListSuccess,
  deleteTaskListFail,
  createTaskListSuccess,
  createTaskListFail,
} from '../actions';
import { ITaskList, IGoogleTaskListsResponse, IGoogleTasksResponse } from 'shared/types/model';

const loadTaskListPattern: NS.ILoadTaskList['type'] = 'TASK_MANAGER:LOAD_TASK_LIST';
const updateTaskListPattern: NS.IUpdateTaskList['type'] = 'TASK_MANAGER:UPDATE_TASK_LIST';
const deleteTaskListPattern: NS.IDeleteTaskList['type'] = 'TASK_MANAGER:DELETE_TASK_LIST';
const createTaskListPattern: NS.ICreateTaskList['type'] = 'TASK_MANAGER:CREATE_TASK_LIST';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadTaskListPattern, loadTaskLists, deps);
  yield takeEvery(updateTaskListPattern, updateTaskList, deps);
  yield takeEvery(deleteTaskListPattern, deleteTaskList, deps);
  yield takeEvery(createTaskListPattern, createTaskList, deps);
}

function* loadTaskLists(deps: IDependencies, action: NS.ILoadTaskList) {
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

function* deleteTaskList(deps: IDependencies, action: NS.IDeleteTaskList) {
  try {
    const id = action.payload;
    const data: ITaskList = yield call(deps.api.deleteTaskList, action.payload);
    yield put(deleteTaskListSuccess({ id, data }));
  } catch (error) {
    yield put(deleteTaskListFail(error));
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
