import { put, select, takeEvery, call, throttle } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import { ITask, IGoogleTasksResponse } from 'services/api/types';
import {
  createTaskSuccess,
  createTaskFail,
} from 'features/addTask/redux/actions';

const createTaskPattern: NS.ICreateTask['type'] = 'CRUD_TASK:CREATE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(createTaskPattern, createTask, deps);
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
