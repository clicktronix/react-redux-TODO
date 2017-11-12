import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IAppReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import { ITask, IGoogleTasksResponse } from 'shared/types/model';
import {
  updateTaskSuccess,
  updateTaskFail,
  updateTaskStatusSuccess,
  updateTaskStatusFail,
  deleteTaskSuccess,
  deleteTaskFail,
} from '../actions';
const updateTaskPattern: NS.IUpdateTask['type'] = 'TASK:UPDATE';
const updateTaskStatusPattern: NS.IUpdateTaskStatus['type'] = 'TASK:UPDATE_STATUS';
const deleteTaskPattern: NS.IDeleteTask['type'] = 'TASK:DELETE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(updateTaskPattern, updateTask, deps);
  yield takeEvery(updateTaskStatusPattern, updateTaskStatus, deps);
  yield takeEvery(deleteTaskPattern, deleteTask, deps);
}

function* updateTask(deps: IDependencies, action: NS.IUpdateTask) {
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.updateTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
      title: action.payload.text,
    });
    yield put(updateTaskSuccess({ id, data}));
  } catch (error) {
    yield put(updateTaskFail(error));
  }
}

function* updateTaskStatus(deps: IDependencies, action: NS.IUpdateTaskStatus) {
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.updateTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
      status: action.payload.isCompleted ? 'completed' : 'needsAction',
    });
    yield put(updateTaskStatusSuccess({ id, data}));
  } catch (error) {
    yield put(updateTaskStatusFail(error));
  }
}

function* deleteTask(deps: IDependencies, action: NS.IDeleteTask) {
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.deleteTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
    });
    yield put(deleteTaskSuccess({ id, data}));
  } catch (error) {
    yield put(deleteTaskFail(error));
  }
}
