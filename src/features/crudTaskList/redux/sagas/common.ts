import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  updateTaskListSuccess,
  updateTaskListFail,
  deleteTaskListSuccess,
  deleteTaskListFail,
} from '../actions';
import { ITaskList, IGoogleTaskListsResponse } from 'services/api/types';

const updateTaskListPattern: NS.IUpdateTaskList['type'] = 'TASK_LIST:UPDATE';
const deleteTaskListPattern: NS.IDeleteTaskList['type'] = 'TASK_LIST:DELETE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(updateTaskListPattern, updateTaskList, deps);
  yield takeEvery(deleteTaskListPattern, deleteTaskList, deps);
}

function* updateTaskList(deps: IDependencies, action: NS.IUpdateTaskList) {
  const { _instanceKey } = action;
  try {
    const id = action.payload.taskListId;
    const data: ITaskList = yield call(deps.api.updateTaskList, {
      taskListId: action.payload.taskListId,
      title: action.payload.title,
    });
    yield put({ ...updateTaskListSuccess({ id, data }), _instanceKey});
  } catch (error) {
    yield put({ ...updateTaskListFail(error), _instanceKey });
  }
}

function* deleteTaskList(deps: IDependencies, action: NS.IDeleteTaskList) {
  const { _instanceKey} = action;
  try {
    const id = action.payload;
    const data: ITaskList = yield call(deps.api.deleteTaskList, action.payload);
    yield put({ ...deleteTaskListSuccess({ id, data }), _instanceKey });
  } catch (error) {
    yield put({ ...deleteTaskListFail(error), _instanceKey });
  }
}
