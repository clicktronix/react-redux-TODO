import { rootSaga as commonSaga } from './common';
import { IDependencies } from 'shared/types/app';
import { all, call } from 'redux-saga/effects';

export function* saga(deps: IDependencies) {
  yield all([
    call(commonSaga, deps),
  ]);
}
