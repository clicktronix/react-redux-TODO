import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import { ITaskResponse } from 'modules/App/redux/namespace';
import {
  updateTaskSuccess,
  updateTaskFail,
  updateTaskStatusSuccess,
  updateTaskStatusFail,
  createTaskSuccess,
  createTaskFail,
  deleteTaskSuccess,
  deleteTaskFail,
} from 'features/crudTask/redux/actions';
// import * as selectors from '../selectors';

const updateTaskPattern: NS.IUpdateTask['type'] = 'CRUD_TASK:UPDATE';
const updateTaskStatusPattern: NS.IUpdateTaskStatus['type'] = 'CRUD_TASK:UPDATE_STATUS';
const createTaskPattern: NS.ICreateTask['type'] = 'CRUD_TASK:CREATE';
const deleteTaskPattern: NS.IDeleteTask['type'] = 'CRUD_TASK:DELETE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(updateTaskPattern, updateTask, deps);
  yield takeEvery(updateTaskStatusPattern, updateTaskStatus, deps);
  yield takeEvery(createTaskPattern, createTask, deps);
  yield takeEvery(deleteTaskPattern, deleteTask, deps);
}

function* updateTask(deps: IDependencies, action: NS.IUpdateTask) {
  try {
    const id = action.payload.taskListId;
    const data: ITaskResponse = yield call(deps.api.updateTask, {
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
    const data: ITaskResponse = yield call(deps.api.updateTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
      status: action.payload.isCompleted ? 'completed' : 'needsAction',
    });
    yield put(updateTaskStatusSuccess({ id, data}));
  } catch (error) {
    yield put(updateTaskStatusFail(error));
  }
}

function* createTask(deps: IDependencies, action: NS.ICreateTask) {
  try {
    const data: ITaskResponse = yield call(deps.api.insertTask, {
      taskListId: action.payload.taskListId,
      title: action.payload.text,
    });
    yield put(createTaskSuccess(data));
  } catch (error) {
    yield put(createTaskFail(error));
  }
}

function* deleteTask(deps: IDependencies, action: NS.IDeleteTask) {
  try {
    const id = action.payload.taskListId;
    const data: ITaskResponse = yield call(deps.api.deleteTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
    });
    yield put(deleteTaskSuccess({ id, data}));
  } catch (error) {
    yield put(deleteTaskFail(error));
  }
}