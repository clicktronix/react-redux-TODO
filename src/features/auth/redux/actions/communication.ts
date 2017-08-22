import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: signIn, completed: signInSuccess, failed: signInFail } =
  makeCommunicationActionCreators<NS.ISignIn, NS.ISignInSuccess, NS.ISignInFail>(
    'AUTH:SIGN_IN', 'AUTH:SIGN_IN_SUCCESS', 'AUTH:SIGN_IN_FAIL',
  );

export function signOut(): NS.ISignOut {
  return { type: 'AUTH:SIGN_OUT' };
}
