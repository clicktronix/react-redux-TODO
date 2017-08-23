import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  createTaskListSuccess,
  createTaskListFail,
} from '../actions';
import { ITaskList, IGoogleTaskListsResponse } from 'services/api/types';

const createTaskListPattern: NS.ICreateTaskList['type'] = 'TASK_LIST:CREATE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(createTaskListPattern, createTaskList, deps);
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
