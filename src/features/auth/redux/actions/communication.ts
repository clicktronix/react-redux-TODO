import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: signIn, completed: signInSuccess, failed: signInFail } =
  makeCommunicationActionCreators<NS.IAuth, NS.IAuthSuccess, NS.IAuthFail>(
    'AUTH:SIGN_IN', 'AUTH:SIGN_IN_SUCCESS', 'AUTH:SIGN_IN_FAIL',
  );

export function logOutHandle(): NS.ISignOut {
  return { type: 'AUTH:SIGN_OUT' };
}
