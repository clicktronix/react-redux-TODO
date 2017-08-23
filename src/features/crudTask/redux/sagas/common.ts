import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import { ITask, IGoogleTasksResponse } from 'services/api/types';
import {
  updateTaskSuccess,
  updateTaskFail,
  updateTaskStatusSuccess,
  updateTaskStatusFail,
  deleteTaskSuccess,
  deleteTaskFail,
} from 'features/crudTask/redux/actions';

const updateTaskPattern: NS.IUpdateTask['type'] = 'CRUD_TASK:UPDATE';
const updateTaskStatusPattern: NS.IUpdateTaskStatus['type'] = 'CRUD_TASK:UPDATE_STATUS';
const deleteTaskPattern: NS.IDeleteTask['type'] = 'CRUD_TASK:DELETE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(updateTaskPattern, updateTask, deps);
  yield takeEvery(updateTaskStatusPattern, updateTaskStatus, deps);
  yield takeEvery(deleteTaskPattern, deleteTask, deps);
}

function* updateTask(deps: IDependencies, action: NS.IUpdateTask) {
  const { _instanceKey } = action;
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.updateTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
      title: action.payload.text,
    });
    yield put({ ...updateTaskSuccess({ id, data}), _instanceKey });
  } catch (error) {
    yield put({ ...updateTaskFail(error), _instanceKey });
  }
}

function* updateTaskStatus(deps: IDependencies, action: NS.IUpdateTaskStatus) {
  const { _instanceKey } = action;
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.updateTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
      status: action.payload.isCompleted ? 'completed' : 'needsAction',
    });
    yield put({ ...updateTaskStatusSuccess({ id, data}), _instanceKey });
  } catch (error) {
    yield put({ ...updateTaskStatusFail(error), _instanceKey });
  }
}

function* deleteTask(deps: IDependencies, action: NS.IDeleteTask) {
  const { _instanceKey } = action;
  try {
    const id = action.payload.taskListId;
    const data: ITask = yield call(deps.api.deleteTask, {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
    });
    yield put({ ...deleteTaskSuccess({ id, data}), _instanceKey});
  } catch (error) {
    yield put({ ...deleteTaskFail(error), _instanceKey});
  }
}
