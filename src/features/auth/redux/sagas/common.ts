import { put, takeLatest , call } from 'redux-saga/effects';
import { IReduxState as IAppReduxState, IDependencies } from 'shared/types/app';
import * as NS from '../../namespace';
import {
  signInSuccess,
  signInFail,
} from 'features/auth/redux/actions';

const signInPattern: NS.ISignIn['type'] = 'AUTH:SIGN_IN';
const signOutPattern: NS.ISignOut['type'] = 'AUTH:SIGN_OUT';

export function* rootSaga(deps: IDependencies) {
  yield takeLatest(signInPattern, signIn, deps);
  yield takeLatest(signOutPattern, signOut, deps);
}

function* signIn(deps: IDependencies, action: NS.ISignIn) {
  try {
    const immediate = action.payload;
    yield call(deps.api.authorize, { immediate });
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* signOut(deps: IDependencies, action: NS.ISignOut) {
  yield call(deps.api.signOut);
}
